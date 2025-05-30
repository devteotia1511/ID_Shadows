
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, XCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PhishingResult {
  url: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  reasons: string[];
  formFields: string[];
  recommendations: string[];
}

export const PhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const analyzePhishing = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 300);

    // Simulate phishing analysis (in real app, would scrape and analyze with AI)
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      // Mock analysis result
      const mockResult: PhishingResult = {
        url: url,
        riskScore: Math.floor(Math.random() * 100),
        riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        reasons: [
          "Domain registered recently (less than 6 months)",
          "No SSL certificate detected",
          "Requests sensitive information immediately",
          "Contains urgent language and pressure tactics"
        ].filter(() => Math.random() > 0.5),
        formFields: [
          "Full Name", "Email Address", "Phone Number", 
          "Social Security Number", "Credit Card Details", "Bank Account"
        ].filter(() => Math.random() > 0.6),
        recommendations: [
          "Verify the website URL carefully for typos",
          "Check for HTTPS encryption before entering data",
          "Contact the organization directly to verify legitimacy",
          "Use two-factor authentication when available"
        ]
      };

      // Adjust risk level based on score
      if (mockResult.riskScore >= 70) mockResult.riskLevel = "high";
      else if (mockResult.riskScore >= 40) mockResult.riskLevel = "medium";
      else mockResult.riskLevel = "low";

      setResult(mockResult);
      setIsAnalyzing(false);
      setProgress(0);

      toast({
        title: "Analysis Complete",
        description: `Phishing risk assessment finished - ${mockResult.riskLevel.toUpperCase()} risk detected`,
        variant: mockResult.riskLevel === "high" ? "destructive" : "default"
      });
    }, 3000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-400";
      case "medium": return "text-orange-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high": return <XCircle className="h-6 w-6 text-red-400" />;
      case "medium": return <AlertTriangle className="h-6 w-6 text-orange-400" />;
      case "low": return <CheckCircle className="h-6 w-6 text-green-400" />;
      default: return <Shield className="h-6 w-6 text-gray-400" />;
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "low": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-gray-100">AI Phishing Form Detector</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex space-x-4">
          <Input
            type="url"
            placeholder="Enter website URL to analyze (e.g., https://suspicious-site.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
          />
          <Button
            onClick={analyzePhishing}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        {isAnalyzing && (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-500 animate-spin" />
              <p className="text-sm font-medium text-gray-300">Analyzing website for phishing indicators...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-400">
              Checking domain reputation, form analysis, and security indicators
            </p>
          </motion.div>
        )}

        {result && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Risk Score Display */}
            <div className="p-6 border rounded-xl bg-gray-700/50 border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-200">Phishing Risk Assessment</h3>
                <div className="flex items-center space-x-2">
                  {getRiskIcon(result.riskLevel)}
                  <span className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>
                    {result.riskScore}/100
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Analyzed URL</p>
                  <p className="font-mono text-sm bg-gray-800 text-gray-200 p-2 rounded border border-gray-600 break-all">
                    {result.url}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Risk Level</p>
                  <Badge className={getRiskBadgeColor(result.riskLevel)}>
                    {result.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>

              <Progress 
                value={result.riskScore} 
                className="w-full"
              />
            </div>

            {/* Risk Reasons */}
            {result.reasons.length > 0 && (
              <Card className="bg-gray-700/50 border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Risk Indicators</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{reason}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Form Fields Detected */}
            {result.formFields.length > 0 && (
              <Card className="bg-gray-700/50 border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-400">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Sensitive Data Requested</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {result.formFields.map((field, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm text-center border border-orange-500/30"
                      >
                        {field}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card className="bg-gray-700/50 border-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-400">
                  <Shield className="h-5 w-5" />
                  <span>Security Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
