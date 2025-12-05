import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail, Eye, Pencil, Send, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { format } from "date-fns";

interface NotificationTemplate {
  id: string;
  name: string;
  slug: string;
  subject: string;
  html_content: string;
  text_content: string | null;
  description: string | null;
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface NotificationLog {
  id: string;
  user_id: string | null;
  template_id: string | null;
  recipient_email: string;
  subject: string;
  content: string;
  variables: Record<string, string>;
  status: string;
  error_message: string | null;
  sent_at: string | null;
  created_at: string;
}

export default function Notifications() {
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testVariables, setTestVariables] = useState<Record<string, string>>({});

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['notification-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as NotificationTemplate[];
    },
  });

  // Fetch logs
  const { data: logs = [], isLoading: logsLoading } = useQuery({
    queryKey: ['notification-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notification_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as NotificationLog[];
    },
  });

  // Update template mutation
  const updateTemplateMutation = useMutation({
    mutationFn: async (template: Partial<NotificationTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from('notification_templates')
        .update({
          name: template.name,
          subject: template.subject,
          html_content: template.html_content,
          text_content: template.text_content,
          description: template.description,
          is_active: template.is_active,
        })
        .eq('id', template.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      toast.success('Template updated');
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to update template');
      console.error(error);
    },
  });

  // Send test notification
  const sendTestMutation = useMutation({
    mutationFn: async ({ template, email, variables }: { template: NotificationTemplate; email: string; variables: Record<string, string> }) => {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: {
          template_slug: template.slug,
          recipient_email: email,
          variables,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notification-logs'] });
      if (data.status === 'sent') {
        toast.success('Test email sent!');
      } else if (data.status === 'logged') {
        toast.info('Notification logged (email sending not configured)');
      } else {
        toast.error('Failed to send email');
      }
      setTestDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to send test notification');
      console.error(error);
    },
  });

  const handleEditClick = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const handlePreviewClick = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handleTestClick = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    // Initialize test variables with placeholders
    const vars: Record<string, string> = {};
    (template.variables || []).forEach((v: string) => {
      vars[v] = `[${v}]`;
    });
    setTestVariables(vars);
    setTestDialogOpen(true);
  };

  const handleSendTest = () => {
    if (!selectedTemplate || !testEmail) return;
    sendTestMutation.mutate({
      template: selectedTemplate,
      email: testEmail,
      variables: testVariables,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Sent</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      case 'logged':
        return <Badge variant="secondary"><FileText className="w-3 h-3 mr-1" /> Logged</Badge>;
      default:
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Email Notifications</h1>
          <p className="text-muted-foreground">Manage notification templates and view delivery logs</p>
        </div>

        <Tabs defaultValue="templates">
          <TabsList>
            <TabsTrigger value="templates">
              <Mail className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="logs">
              <FileText className="w-4 h-4 mr-2" />
              Delivery Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            {templatesLoading ? (
              <div className="text-center py-8">Loading templates...</div>
            ) : (
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {template.name}
                            {!template.is_active && (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handlePreviewClick(template)}>
                            <Eye className="w-4 h-4 mr-1" /> Preview
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(template)}>
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm" onClick={() => handleTestClick(template)}>
                            <Send className="w-4 h-4 mr-1" /> Test
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Subject:</span> {template.subject}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Variables:</span>{' '}
                        {(template.variables || []).map((v: string) => (
                          <code key={v} className="bg-muted px-1 rounded mx-0.5">{`{{${v}}}`}</code>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs">
            {logsLoading ? (
              <div className="text-center py-8">Loading logs...</div>
            ) : logs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No notification logs yet
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(log.created_at), 'MMM d, h:mm a')}
                        </TableCell>
                        <TableCell>{log.recipient_email}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{log.subject}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-destructive">
                          {log.error_message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Template Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Template: {selectedTemplate?.name}</DialogTitle>
            </DialogHeader>
            {selectedTemplate && (
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={selectedTemplate.name}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={selectedTemplate.description || ''}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>HTML Content</Label>
                  <Textarea
                    value={selectedTemplate.html_content}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, html_content: e.target.value })}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label>Plain Text Content</Label>
                  <Textarea
                    value={selectedTemplate.text_content || ''}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, text_content: e.target.value })}
                    rows={5}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={selectedTemplate.is_active}
                    onCheckedChange={(checked) => setSelectedTemplate({ ...selectedTemplate, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={() => updateTemplateMutation.mutate(selectedTemplate)}
                    disabled={updateTemplateMutation.isPending}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview: {selectedTemplate?.name}</DialogTitle>
            </DialogHeader>
            {selectedTemplate && (
              <div className="border rounded-lg p-4 bg-white">
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </div>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.html_content }}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Test Send Dialog */}
        <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Test: {selectedTemplate?.name}</DialogTitle>
            </DialogHeader>
            {selectedTemplate && (
              <div className="space-y-4">
                <div>
                  <Label>Recipient Email</Label>
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Variables</Label>
                  {(selectedTemplate.variables || []).map((variable: string) => (
                    <div key={variable} className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm min-w-[140px]">{`{{${variable}}}`}</code>
                      <Input
                        value={testVariables[variable] || ''}
                        onChange={(e) => setTestVariables({ ...testVariables, [variable]: e.target.value })}
                        placeholder={`Value for ${variable}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setTestDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handleSendTest}
                    disabled={!testEmail || sendTestMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sendTestMutation.isPending ? 'Sending...' : 'Send Test'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
