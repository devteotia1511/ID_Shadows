
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const analyzeWebsite = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis - in a real app, you'd call your AI service
    setTimeout(() => {
      const mockResult = {
        url: url,
        safetyScore: Math.floor(Math.random() * 100),
        isPhishing: Math.random() > 0.7,
        risks: [
          "Requests excessive personal information",
          "No SSL certificate detected",
          "Domain registered recently"
        ].filter(() => Math.random() > 0.5),
        recommendations: [
          "Verify the website's legitimacy before sharing personal information",
          "Check for secure connection (HTTPS)",
          "Look for official contact information and privacy policy"
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: "Website safety assessment finished",
      });
    }, 3000);
  };

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSafetyIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-purple-600" />
            <span>Website Safety Analyzer</span>
          </CardTitle>
          <CardDescription>
            Analyze websites for phishing attempts and privacy risks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <Input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={analyzeWebsite}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-500 animate-spin" />
                <p className="text-sm font-medium">Analyzing website security...</p>
              </div>
              <Progress value={33} className="w-full" />
              <p className="text-xs text-gray-500">
                Checking for phishing indicators and privacy risks
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
              <div className="p-6 border rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Safety Assessment</h3>
                  <div className="flex items-center space-x-2">
                    {getSafetyIcon(analysisResult.safetyScore)}
                    <span className={`text-2xl font-bold ${getSafetyColor(analysisResult.safetyScore)}`}>
                      {analysisResult.safetyScore}/100
                    </span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Website URL</p>
                    <p className="font-mono text-sm bg-white p-2 rounded border break-all">
                      {analysisResult.url}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phishing Risk</p>
                    <Badge 
                      className={analysisResult.isPhishing 
                        ? "bg-red-100 text-red-800 border-red-200" 
                        : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {analysisResult.isPhishing ? "High Risk" : "Low Risk"}
                    </Badge>
                  </div>
                </div>

                <Progress 
                  value={analysisResult.safetyScore} 
                  className="w-full"
                />
              </div>

              {analysisResult.risks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Identified Risks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.risks.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <Shield className="h-5 w-5" />
                    <span>Safety Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
