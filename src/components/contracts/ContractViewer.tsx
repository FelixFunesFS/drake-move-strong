import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileCheck, Loader2 } from "lucide-react";
import SignaturePad from "./SignaturePad";

interface ContractTemplate {
  id: string;
  name: string;
  slug: string;
  content: string;
  contract_type: string;
  requires_signature: boolean;
  version: number;
}

interface ContractViewerProps {
  template: ContractTemplate;
  onSigned?: () => void;
  readOnly?: boolean;
  existingSignature?: string | null;
}

export default function ContractViewer({ 
  template, 
  onSigned, 
  readOnly = false,
  existingSignature 
}: ContractViewerProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [agreed, setAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const signContractMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("member_contracts")
        .insert({
          user_id: user.id,
          template_id: template.id,
          template_version: template.version,
          signature_data: signatureData,
          ip_address: null, // Could capture via edge function if needed
          user_agent: navigator.userAgent,
          metadata: {
            signed_from: window.location.pathname,
            browser: navigator.userAgent,
          },
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-contracts"] });
      queryClient.invalidateQueries({ queryKey: ["unsigned-contracts"] });
      toast.success(`${template.name} signed successfully!`);
      onSigned?.();
    },
    onError: (error) => {
      console.error("Error signing contract:", error);
      toast.error("Failed to sign contract. Please try again.");
    },
  });

  const canSign = agreed && (!template.requires_signature || signatureData);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith("- ")) {
        return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={index} className="font-bold my-2">{line.slice(2, -2)}</p>;
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return <p key={index} className="my-2">{line}</p>;
    });
  };

  const getTypeBadge = () => {
    switch (template.contract_type) {
      case "waiver":
        return <Badge variant="destructive">Waiver</Badge>;
      case "agreement":
        return <Badge variant="secondary">Agreement</Badge>;
      case "terms":
        return <Badge>Terms</Badge>;
      default:
        return <Badge variant="outline">{template.contract_type}</Badge>;
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{template.name}</CardTitle>
          <div className="flex items-center gap-2">
            {getTypeBadge()}
            <span className="text-sm text-muted-foreground">v{template.version}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScrollArea className="h-[400px] border rounded-lg p-6 bg-muted/30">
          <div className="prose prose-sm max-w-none">
            {renderContent(template.content)}
          </div>
        </ScrollArea>

        {!readOnly && (
          <>
            {template.requires_signature && (
              <div className="space-y-2">
                <Label className="text-base font-medium">Your Signature</Label>
                <SignaturePad onSignatureChange={setSignatureData} />
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="agree" className="text-sm leading-relaxed cursor-pointer">
                I have read and understand the terms of this {template.contract_type}. 
                I agree to be bound by its terms and conditions.
              </Label>
            </div>
          </>
        )}

        {readOnly && existingSignature && (
          <div className="space-y-2">
            <Label className="text-base font-medium">Signature on File</Label>
            <div className="border rounded-lg p-4 bg-white">
              <img 
                src={existingSignature} 
                alt="Signature" 
                className="max-h-[100px] mx-auto"
              />
            </div>
          </div>
        )}
      </CardContent>
      
      {!readOnly && (
        <CardFooter>
          <Button
            onClick={() => signContractMutation.mutate()}
            disabled={!canSign || signContractMutation.isPending}
            className="w-full"
            size="lg"
          >
            {signContractMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4 mr-2" />
                Sign {template.name}
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
