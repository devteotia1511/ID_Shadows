
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, AlertTriangle, Info, Eye, EyeOff, Download } from "lucide-react";
import { useState } from "react";

interface PIIAnalysisProps {
  extractedText: string;
  detectedPII: any[];
}

export const PIIAnalysis = ({ extractedText, detectedPII }: PIIAnalysisProps) => {
  const [showRedacted, setShowRedacted] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Info className="h-4 w-4" />;
      case "low": return <Shield className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const redactText = (text: string) => {
    let redacted = text;
    detectedPII.forEach(pii => {
      redacted = redacted.replace(new RegExp(pii.value, 'gi'), '█'.repeat(pii.value.length));
    });
    return redacted;
  };

  const downloadRedactedDocument = () => {
    const redactedText = redactText(extractedText);
    const blob = new Blob([redactedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redacted-document.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* PII Detection Results */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span>PII Detection Results</span>
          </CardTitle>
          <CardDescription>
            Sensitive information found in your document
          </CardDescription>
        </CardHeader>
        <CardContent>
          {detectedPII.length > 0 ? (
            <div className="space-y-4">
              {detectedPII.map((pii, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{pii.type}</span>
                      <Badge className={getRiskColor(pii.risk)}>
                        {getRiskIcon(pii.risk)}
                        <span className="ml-1">{pii.risk} Risk</span>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                    {pii.value}
                  </p>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setShowRedacted(!showRedacted)}
                  variant="outline"
                  size="sm"
                >
                  {showRedacted ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                  {showRedacted ? "Show Original" : "Preview Redacted"}
                </Button>
                
                <Button
                  onClick={downloadRedactedDocument}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Redacted
                </Button>
              </div>
            </div>
          ) : extractedText ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No PII Detected</h3>
              <p className="text-gray-600">Your document appears to be safe from sensitive information exposure.</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Upload a document to analyze for PII
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extracted Text Preview */}
      {extractedText && (
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-white/20">
          <CardHeader>
            <CardTitle>Extracted Text</CardTitle>
            <CardDescription>
              {showRedacted ? "Redacted version with PII hidden" : "Original text from your document"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {showRedacted ? redactText(extractedText) : extractedText}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
