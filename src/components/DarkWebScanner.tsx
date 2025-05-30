
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, Shield, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface BreachData {
  name: string;
  date: string;
  dataTypes: string[];
  description: string;
}

export const DarkWebScanner = () => {
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [breaches, setBreaches] = useState<BreachData[]>([]);
  const [hasScanned, setHasScanned] = useState(false);
  const { toast } = useToast();

  const scanForBreaches = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate API call to HaveIBeenPwned
    setTimeout(() => {
      const mockBreaches: BreachData[] = Math.random() > 0.5 ? [
        {
          name: "Data Breach 2023",
          date: "2023-08-15",
          dataTypes: ["Email addresses", "Passwords", "Names"],
          description: "A major social media platform suffered a data breach affecting millions of users."
        },
        {
          name: "Shopping Site Leak",
          date: "2022-12-03",
          dataTypes: ["Email addresses", "Phone numbers", "Purchase history"],
          description: "An e-commerce website exposed customer data due to a security vulnerability."
        }
      ] : [];

      setBreaches(mockBreaches);
      setHasScanned(true);
      setIsScanning(false);

      if (mockBreaches.length > 0) {
        toast({
          title: "Breaches Found",
          description: `Your email was found in ${mockBreaches.length} data breach(es)`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Good News!",
          description: "No breaches found for your email address",
        });
      }
    }, 3000);
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(249, 115, 22, 0.5)",
                "0 0 30px rgba(239, 68, 68, 0.7)",
                "0 0 20px rgba(249, 115, 22, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Database className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-gray-100">Dark Web Scanner</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex space-x-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
          />
          <Button
            onClick={scanForBreaches}
            disabled={isScanning}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
          >
            <Search className="h-4 w-4 mr-2" />
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </div>

        {isScanning && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Scanning dark web databases...</p>
          </motion.div>
        )}

        {hasScanned && !isScanning && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {breaches.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">All Clear!</h3>
                <p className="text-gray-300">Your email wasn't found in any known data breaches.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 font-semibold">
                    {breaches.length} breach(es) found
                  </span>
                </div>
                
                {breaches.map((breach, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-red-400">{breach.name}</h4>
                      <Badge className="bg-red-100 text-red-800">
                        {breach.date}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{breach.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {breach.dataTypes.map((type, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
