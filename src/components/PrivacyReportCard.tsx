
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface PIIItem {
  type: string;
  value: string;
  risk: string;
}

interface PrivacyReportCardProps {
  detectedPII: PIIItem[];
  extractedText: string;
}

export const PrivacyReportCard = ({ detectedPII, extractedText }: PrivacyReportCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const calculatePrivacyScore = () => {
    if (detectedPII.length === 0) return 95;
    
    const riskScores = { high: 30, medium: 15, low: 5 };
    const totalRisk = detectedPII.reduce((acc, pii) => {
      return acc + (riskScores[pii.risk.toLowerCase() as keyof typeof riskScores] || 0);
    }, 0);
    
    return Math.max(0, 100 - totalRisk);
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-green-400" };
    if (score >= 80) return { grade: "B", color: "text-blue-400" };
    if (score >= 70) return { grade: "C", color: "text-yellow-400" };
    if (score >= 60) return { grade: "D", color: "text-orange-400" };
    return { grade: "F", color: "text-red-400" };
  };

  const privacyScore = calculatePrivacyScore();
  const { grade, color } = getGrade(privacyScore);

  const downloadReport = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      const reportContent = `
Privacy Report Card
==================
Privacy Score: ${privacyScore}/100 (Grade: ${grade})
PII Fields Detected: ${detectedPII.length}

Risk Analysis:
${detectedPII.map(pii => `- ${pii.type}: ${pii.risk} risk`).join('\n')}

Recommendations:
- Limit sharing of high-risk information
- Use secure channels for sensitive data
- Regularly monitor your digital footprint
      `;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'privacy-report.txt';
      a.click();
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.5)",
                "0 0 30px rgba(20, 184, 166, 0.7)",
                "0 0 20px rgba(16, 185, 129, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FileText className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-gray-100">Privacy Report Card</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center">
          <motion.div 
            className={`text-6xl font-bold ${color} mb-2`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {grade}
          </motion.div>
          <div className="text-2xl font-semibold text-gray-100 mb-4">
            {privacyScore}/100
          </div>
          <Progress value={privacyScore} className="w-full" />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{detectedPII.length}</div>
            <div className="text-sm text-gray-300">PII Fields</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {detectedPII.filter(pii => pii.risk === 'high').length}
            </div>
            <div className="text-sm text-gray-300">High Risk</div>
          </div>
        </div>

        {/* Download Button */}
        <Button
          onClick={downloadReport}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating Report..." : "Download Report"}
        </Button>
      </CardContent>
    </Card>
  );
};
