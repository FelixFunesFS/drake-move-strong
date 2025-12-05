import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileText, Plus, Pencil, Eye, Users, FileCheck } from "lucide-react";
import { format } from "date-fns";

interface ContractTemplate {
  id: string;
  name: string;
  slug: string;
  content: string;
  contract_type: string;
  requires_signature: boolean;
  is_required_for_booking: boolean;
  version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SignedContract {
  id: string;
  user_id: string;
  template_id: string;
  template_version: number;
  signature_data: string | null;
  signed_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  } | null;
  contract_templates: {
    name: string;
  } | null;
}

const contractTypes = [
  { value: "waiver", label: "Waiver" },
  { value: "agreement", label: "Agreement" },
  { value: "terms", label: "Terms & Conditions" },
  { value: "other", label: "Other" },
];

export default function AdminContracts() {
  const queryClient = useQueryClient();
  const [editingTemplate, setEditingTemplate] = useState<ContractTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingSignature, setViewingSignature] = useState<SignedContract | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    content: "",
    contract_type: "waiver",
    requires_signature: true,
    is_required_for_booking: false,
    is_active: true,
  });

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["admin-contract-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as ContractTemplate[];
    },
  });

  // Fetch all signed contracts
  const { data: signedContracts = [], isLoading: signedLoading } = useQuery({
    queryKey: ["admin-signed-contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("member_contracts")
        .select(`
          *,
          contract_templates (name)
        `)
        .order("signed_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      
      // Fetch profiles separately
      const userIds = [...new Set(data.map(d => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email")
        .in("id", userIds);
      
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      return data.map(contract => ({
        ...contract,
        profiles: profileMap.get(contract.user_id) || null,
      })) as SignedContract[];
    },
  });

  // Create template
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: result, error } = await supabase
        .from("contract_templates")
        .insert({
          name: data.name,
          slug: data.slug,
          content: data.content,
          contract_type: data.contract_type as "waiver" | "agreement" | "terms" | "other",
          requires_signature: data.requires_signature,
          is_required_for_booking: data.is_required_for_booking,
          is_active: data.is_active,
        })
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contract-templates"] });
      toast.success("Contract template created");
      resetForm();
      setIsCreating(false);
    },
    onError: (error) => {
      toast.error("Failed to create template");
      console.error(error);
    },
  });

  // Update template
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<ContractTemplate> & { id: string }) => {
      const { data: result, error } = await supabase
        .from("contract_templates")
        .update({
          name: data.name,
          content: data.content,
          contract_type: data.contract_type as "waiver" | "agreement" | "terms" | "other",
          requires_signature: data.requires_signature,
          is_required_for_booking: data.is_required_for_booking,
          is_active: data.is_active,
          version: (editingTemplate?.version || 1) + 1,
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contract-templates"] });
      toast.success("Contract template updated (new version created)");
      setEditingTemplate(null);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update template");
      console.error(error);
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      content: "",
      contract_type: "waiver",
      requires_signature: true,
      is_required_for_booking: false,
      is_active: true,
    });
  };

  const handleEdit = (template: ContractTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      slug: template.slug,
      content: template.content,
      contract_type: template.contract_type,
      requires_signature: template.requires_signature,
      is_required_for_booking: template.is_required_for_booking,
      is_active: template.is_active,
    });
  };

  const handleSubmit = () => {
    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "waiver":
        return <Badge variant="destructive">Waiver</Badge>;
      case "agreement":
        return <Badge variant="secondary">Agreement</Badge>;
      case "terms":
        return <Badge>Terms</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contracts & Waivers</h1>
            <p className="text-muted-foreground">Manage contract templates and view signed documents</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>

        <Tabs defaultValue="templates">
          <TabsList>
            <TabsTrigger value="templates">
              <FileText className="w-4 h-4 mr-2" />
              Templates ({templates.length})
            </TabsTrigger>
            <TabsTrigger value="signed">
              <Users className="w-4 h-4 mr-2" />
              Signed Contracts ({signedContracts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            {templatesLoading ? (
              <div className="text-center py-8">Loading templates...</div>
            ) : templates.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No contract templates yet. Create one to get started.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {template.name}
                              {!template.is_active && <Badge variant="secondary">Inactive</Badge>}
                              {template.is_required_for_booking && (
                                <Badge variant="destructive">Required</Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              {getTypeBadge(template.contract_type)}
                              <span>Version {template.version}</span>
                              <span>• {template.requires_signature ? "Signature required" : "No signature"}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => handleEdit(template)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="signed">
            {signedLoading ? (
              <div className="text-center py-8">Loading signed contracts...</div>
            ) : signedContracts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No signed contracts yet
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Contract</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Signed</TableHead>
                      <TableHead>Signature</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signedContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {contract.profiles?.first_name} {contract.profiles?.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {contract.profiles?.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contract.contract_templates?.name}</TableCell>
                        <TableCell>v{contract.template_version}</TableCell>
                        <TableCell>
                          {format(new Date(contract.signed_at), "MMM d, yyyy h:mm a")}
                        </TableCell>
                        <TableCell>
                          {contract.signature_data ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setViewingSignature(contract)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Create/Edit Template Dialog */}
        <Dialog 
          open={isCreating || !!editingTemplate} 
          onOpenChange={() => {
            setIsCreating(false);
            setEditingTemplate(null);
            resetForm();
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? `Edit: ${editingTemplate.name}` : "Create Contract Template"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: isCreating ? generateSlug(e.target.value) : formData.slug,
                      });
                    }}
                    placeholder="Liability Waiver"
                  />
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="liability-waiver"
                    disabled={!!editingTemplate}
                  />
                </div>
              </div>

              <div>
                <Label>Type *</Label>
                <Select
                  value={formData.contract_type}
                  onValueChange={(value) => setFormData({ ...formData, contract_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Content * (Markdown supported)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  placeholder="# Contract Title&#10;&#10;## Section 1&#10;Content here..."
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.requires_signature}
                    onCheckedChange={(checked) => setFormData({ ...formData, requires_signature: checked })}
                  />
                  <Label>Requires signature</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_required_for_booking}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_required_for_booking: checked })}
                  />
                  <Label>Required for booking classes</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>

              {editingTemplate && (
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  Note: Updating this template will create a new version (v{editingTemplate.version + 1}). 
                  Members who signed previous versions will need to sign again.
                </p>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingTemplate(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.slug || !formData.content || createMutation.isPending || updateMutation.isPending}
                >
                  {editingTemplate ? "Update Template" : "Create Template"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Signature Dialog */}
        <Dialog open={!!viewingSignature} onOpenChange={() => setViewingSignature(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Signature - {viewingSignature?.profiles?.first_name} {viewingSignature?.profiles?.last_name}
              </DialogTitle>
            </DialogHeader>
            {viewingSignature?.signature_data && (
              <div className="border rounded-lg p-4 bg-white">
                <img
                  src={viewingSignature.signature_data}
                  alt="Signature"
                  className="max-h-[200px] mx-auto"
                />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Signed on {format(new Date(viewingSignature.signed_at), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
