
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Info } from "lucide-react";
import { motion } from "framer-motion";

interface PIIItem {
  type: string;
  value: string;
  risk: string;
  position?: { start: number; end: number };
}

interface PrivacyHeatmapProps {
  extractedText: string;
  detectedPII: PIIItem[];
}

export const PrivacyHeatmap = ({ extractedText, detectedPII }: PrivacyHeatmapProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-500/30 border-red-400 text-red-200";
      case "medium": return "bg-orange-500/30 border-orange-400 text-orange-200";
      case "low": return "bg-green-500/30 border-green-400 text-green-200";
      default: return "bg-gray-500/30 border-gray-400 text-gray-200";
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

  const createHeatmapText = () => {
    let highlightedText = extractedText;
    const highlights: Array<{ start: number; end: number; risk: string; type: string }> = [];

    // Find positions of PII in text and create highlights
    detectedPII.forEach(pii => {
      const regex = new RegExp(pii.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let match;
      while ((match = regex.exec(extractedText)) !== null) {
        highlights.push({
          start: match.index,
          end: match.index + match[0].length,
          risk: pii.risk,
          type: pii.type
        });
      }
    });

    // Sort highlights by position
    highlights.sort((a, b) => a.start - b.start);

    // Create segments with highlighting
    const segments = [];
    let lastIndex = 0;

    highlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        segments.push({
          text: extractedText.slice(lastIndex, highlight.start),
          isHighlight: false
        });
      }

      // Add highlighted text
      segments.push({
        text: extractedText.slice(highlight.start, highlight.end),
        isHighlight: true,
        risk: highlight.risk,
        type: highlight.type
      });

      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < extractedText.length) {
      segments.push({
        text: extractedText.slice(lastIndex),
        isHighlight: false
      });
    }

    return segments;
  };

  const textSegments = createHeatmapText();

  const riskCounts = detectedPII.reduce((acc, pii) => {
    acc[pii.risk.toLowerCase()] = (acc[pii.risk.toLowerCase()] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 30px rgba(249, 115, 22, 0.7)",
                "0 0 20px rgba(239, 68, 68, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <AlertTriangle className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-white">Privacy Risk Heatmap</span>
        </CardTitle>
        
        {/* Risk Summary */}
        <div className="flex flex-wrap gap-2 mt-4">
          <motion.div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-400"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-200">
              High Risk: {riskCounts.high || 0}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-orange-200">
              Medium Risk: {riskCounts.medium || 0}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-400"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-200">
              Low Risk: {riskCounts.low || 0}
            </span>
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-gray-900/50 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-700">
          <div className="text-sm leading-relaxed">
            {textSegments.map((segment, index) => (
              segment.isHighlight ? (
                <motion.span
                  key={index}
                  className={`px-1 py-0.5 rounded border-2 ${getRiskColor(segment.risk || '')}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  title={`${segment.type} - ${segment.risk} Risk`}
                >
                  {segment.text}
                </motion.span>
              ) : (
                <span key={index} className="text-gray-300">{segment.text}</span>
              )
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-medium text-blue-200 mb-2">Risk Level Guide:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">High: PAN, Aadhaar, Passwords</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-gray-300">Medium: Email, Phone, Address</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Low: Name, Gender, Age</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
