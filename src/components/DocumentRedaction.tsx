
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Download, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface PIIItem {
  type: string;
  value: string;
  risk: string;
}

interface DocumentRedactionProps {
  extractedText: string;
  detectedPII: PIIItem[];
}

export const DocumentRedaction = ({ extractedText, detectedPII }: DocumentRedactionProps) => {
  const [redactedItems, setRedactedItems] = useState<Set<string>>(new Set());
  const [showRedacted, setShowRedacted] = useState(true);

  const toggleRedaction = (value: string) => {
    const newRedacted = new Set(redactedItems);
    if (newRedacted.has(value)) {
      newRedacted.delete(value);
    } else {
      newRedacted.add(value);
    }
    setRedactedItems(newRedacted);
  };

  const redactAll = () => {
    setRedactedItems(new Set(detectedPII.map(pii => pii.value)));
  };

  const clearRedactions = () => {
    setRedactedItems(new Set());
  };

  const createRedactedText = () => {
    let redactedText = extractedText;
    
    redactedItems.forEach(value => {
      const regex = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      redactedText = redactedText.replace(regex, showRedacted ? '█'.repeat(value.length) : value);
    });

    return redactedText;
  };

  const downloadRedactedDocument = () => {
    const redactedContent = createRedactedText();
    const blob = new Blob([redactedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redacted-document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-500/20 border-red-400 text-red-200";
      case "medium": return "bg-orange-500/20 border-orange-400 text-orange-200";
      case "low": return "bg-green-500/20 border-green-400 text-green-200";
      default: return "bg-gray-500/20 border-gray-400 text-gray-200";
    }
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(245, 158, 11, 0.5)",
                "0 0 30px rgba(249, 115, 22, 0.7)",
                "0 0 20px rgba(245, 158, 11, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lock className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-white">Document Redaction</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* PII Controls */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Detected Sensitive Information</h3>
            <div className="flex space-x-2">
              <Button
                onClick={redactAll}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Redact All
              </Button>
              <Button
                onClick={clearRedactions}
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            {detectedPII.map((pii, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${getRiskColor(pii.risk)}`}
              >
                <div className="flex items-center space-x-3">
                  <Badge className={getRiskColor(pii.risk)}>
                    {pii.type}
                  </Badge>
                  <span className="font-mono text-sm text-gray-300">
                    {redactedItems.has(pii.value) && showRedacted 
                      ? '█'.repeat(pii.value.length) 
                      : pii.value}
                  </span>
                </div>
                <Button
                  onClick={() => toggleRedaction(pii.value)}
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {redactedItems.has(pii.value) ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Document Preview</h3>
          <Button
            onClick={() => setShowRedacted(!showRedacted)}
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {showRedacted ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Original
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Show Redacted
              </>
            )}
          </Button>
        </div>

        {/* Document Preview */}
        <div className="bg-gray-900/50 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-700">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            {createRedactedText()}
          </pre>
        </div>

        {/* Download Button */}
        <Button
          onClick={downloadRedactedDocument}
          className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Redacted Document
        </Button>
      </CardContent>
    </Card>
  );
};
