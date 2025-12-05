import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MemberLayout from "@/components/member/MemberLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileCheck, AlertTriangle, Eye } from "lucide-react";
import { format } from "date-fns";
import ContractViewer from "@/components/contracts/ContractViewer";

interface ContractTemplate {
  id: string;
  name: string;
  slug: string;
  content: string;
  contract_type: string;
  requires_signature: boolean;
  is_required_for_booking: boolean;
  version: number;
}

interface SignedContract {
  id: string;
  template_id: string;
  template_version: number;
  signature_data: string | null;
  signed_at: string;
  contract_templates: ContractTemplate;
}

export default function MemberContracts() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [viewingContract, setViewingContract] = useState<SignedContract | null>(null);

  // Fetch all active contract templates
  const { data: templates = [] } = useQuery({
    queryKey: ["contract-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data as ContractTemplate[];
    },
  });

  // Fetch user's signed contracts
  const { data: signedContracts = [], refetch: refetchSigned } = useQuery({
    queryKey: ["member-contracts", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("member_contracts")
        .select(`
          *,
          contract_templates (*)
        `)
        .eq("user_id", user.id)
        .order("signed_at", { ascending: false });
      if (error) throw error;
      return data as SignedContract[];
    },
    enabled: !!user,
  });

  // Determine which contracts are pending (not signed or outdated version)
  const pendingContracts = templates.filter((template) => {
    const signed = signedContracts.find(
      (sc) => sc.template_id === template.id && sc.template_version === template.version
    );
    return !signed;
  });

  const requiredPending = pendingContracts.filter((t) => t.is_required_for_booking);

  const handleContractSigned = () => {
    setSelectedTemplate(null);
    refetchSigned();
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
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contracts & Waivers</h1>
          <p className="text-muted-foreground">
            View and sign required documents for your membership
          </p>
        </div>

        {requiredPending.length > 0 && (
          <Card className="border-amber-500 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                You have {requiredPending.length} required document{requiredPending.length !== 1 ? "s" : ""} to sign before booking classes.
              </p>
              <div className="flex flex-wrap gap-2">
                {requiredPending.map((template) => (
                  <Button
                    key={template.id}
                    variant="default"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Sign {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Pending ({pendingContracts.length})
            </TabsTrigger>
            <TabsTrigger value="signed" className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Signed ({signedContracts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingContracts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileCheck className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-medium">All documents signed!</p>
                  <p className="text-muted-foreground">You're all caught up.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingContracts.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {template.name}
                              {template.is_required_for_booking && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              {getTypeBadge(template.contract_type)}
                              <span>Version {template.version}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Button onClick={() => setSelectedTemplate(template)}>
                          Review & Sign
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="signed" className="space-y-4">
            {signedContracts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No signed contracts yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {signedContracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileCheck className="w-8 h-8 text-green-500" />
                          <div>
                            <CardTitle className="text-lg">
                              {contract.contract_templates.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              {getTypeBadge(contract.contract_templates.contract_type)}
                              <span>Signed {format(new Date(contract.signed_at), "MMM d, yyyy 'at' h:mm a")}</span>
                              <span>• v{contract.template_version}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => setViewingContract(contract)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Sign Contract Dialog */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTemplate && (
              <ContractViewer
                template={selectedTemplate}
                onSigned={handleContractSigned}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* View Signed Contract Dialog */}
        <Dialog open={!!viewingContract} onOpenChange={() => setViewingContract(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {viewingContract?.contract_templates.name} - Signed Copy
              </DialogTitle>
            </DialogHeader>
            {viewingContract && (
              <ContractViewer
                template={viewingContract.contract_templates}
                readOnly
                existingSignature={viewingContract.signature_data}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MemberLayout>
  );
}
