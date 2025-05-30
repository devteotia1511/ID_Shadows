
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PIIItem {
  type: string;
  value: string;
  risk: string;
}

interface SmartSuggestionsProps {
  detectedPII: PIIItem[];
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  risk: string;
  explanation?: string;
}

export const SmartSuggestions = ({ detectedPII }: SmartSuggestionsProps) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});

  // Generate smart suggestions based on detected PII
  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    detectedPII.forEach((pii, index) => {
      switch (pii.type.toLowerCase()) {
        case 'email':
          suggestions.push({
            id: `email-${index}`,
            title: "Email Address Protection",
            description: "Consider using a secondary email for non-essential services to protect your primary email from spam and breaches.",
            risk: pii.risk
          });
          break;
        case 'phone':
          suggestions.push({
            id: `phone-${index}`,
            title: "Phone Number Privacy",
            description: "Avoid sharing your primary phone number on public forms. Consider using virtual numbers for online registrations.",
            risk: pii.risk
          });
          break;
        case 'address':
          suggestions.push({
            id: `address-${index}`,
            title: "Address Information Security",
            description: "Only share your full address with trusted entities. Use a P.O. Box for non-essential deliveries.",
            risk: pii.risk
          });
          break;
        case 'id number':
          suggestions.push({
            id: `id-${index}`,
            title: "Government ID Protection",
            description: "Never share government ID numbers unless absolutely mandatory. Always verify the legitimacy of the requesting entity.",
            risk: pii.risk
          });
          break;
        default:
          if (pii.risk.toLowerCase() === 'high') {
            suggestions.push({
              id: `general-${index}`,
              title: "High-Risk Information Detected",
              description: "This information should only be shared with verified, trusted organizations for legitimate purposes.",
              risk: pii.risk
            });
          }
      }
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-500/20 border-red-400 text-red-200";
      case "medium": return "bg-orange-500/20 border-orange-400 text-orange-200";
      case "low": return "bg-green-500/20 border-green-400 text-green-200";
      default: return "bg-gray-500/20 border-gray-400 text-gray-200";
    }
  };

  const handleWhyClick = async (suggestionId: string, suggestionTitle: string) => {
    if (explanations[suggestionId]) {
      setExpandedSuggestion(expandedSuggestion === suggestionId ? null : suggestionId);
      return;
    }

    setLoadingExplanation(suggestionId);
    
    // Simulate AI explanation generation (in real app, call OpenAI API)
    setTimeout(() => {
      const mockExplanations: Record<string, string> = {
        'email': "Email addresses are commonly targeted in phishing attacks and data breaches. Using a secondary email for non-essential services helps compartmentalize your digital identity and reduces the risk of your primary email being compromised. This practice also helps you identify which services may have been breached if you start receiving suspicious emails to specific addresses.",
        'phone': "Phone numbers are valuable for identity theft and social engineering attacks. Scammers can use your phone number for SIM swapping attacks, where they transfer your number to their device to bypass two-factor authentication. Virtual phone numbers provide a layer of protection while still allowing you to receive necessary communications.",
        'address': "Physical addresses can be used for identity theft, stalking, or physical security threats. Sharing your address unnecessarily increases your attack surface. P.O. Boxes provide a secure alternative for receiving mail while keeping your home address private.",
        'id': "Government ID numbers are among the most sensitive pieces of personal information. They can be used to open accounts, apply for credit, or impersonate you with government agencies. Only share these with verified organizations that have a legitimate need and proper security measures in place."
      };

      const explanation = mockExplanations[suggestionTitle.toLowerCase().includes('email') ? 'email' :
                                          suggestionTitle.toLowerCase().includes('phone') ? 'phone' :
                                          suggestionTitle.toLowerCase().includes('address') ? 'address' : 'id'] ||
                         "This suggestion helps protect your personal information by reducing unnecessary exposure and limiting potential attack vectors. Always follow the principle of data minimization - only share what's absolutely necessary.";

      setExplanations(prev => ({ ...prev, [suggestionId]: explanation }));
      setExpandedSuggestion(suggestionId);
      setLoadingExplanation(null);
    }, 1500);
  };

  if (suggestions.length === 0) {
    return (
      <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
        <CardContent className="text-center py-8">
          <Lightbulb className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No Specific Suggestions</h3>
          <p className="text-gray-300">Your document appears to have minimal privacy risks. Keep up the good privacy practices!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 30px rgba(139, 92, 246, 0.7)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lightbulb className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-white">Smart Sharing Suggestions</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-white">{suggestion.title}</h4>
                  <Badge className={getRiskColor(suggestion.risk)}>
                    {suggestion.risk} Risk
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">{suggestion.description}</p>
              </div>
              
              <Button
                onClick={() => handleWhyClick(suggestion.id, suggestion.title)}
                variant="ghost"
                size="sm"
                className="ml-2 flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-gray-600"
                disabled={loadingExplanation === suggestion.id}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Why?</span>
                {explanations[suggestion.id] && (
                  expandedSuggestion === suggestion.id ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            <AnimatePresence>
              {expandedSuggestion === suggestion.id && explanations[suggestion.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-blue-500/10 rounded-lg border-l-4 border-blue-400"
                >
                  <p className="text-sm text-blue-200 leading-relaxed">
                    {explanations[suggestion.id]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {loadingExplanation === suggestion.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                  <span className="text-sm text-gray-300">Generating explanation...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};
