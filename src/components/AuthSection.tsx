
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Lock, User, Mail } from "lucide-react";

interface AuthSectionProps {
  onLogin: () => void;
}

export const AuthSection = ({ onLogin }: AuthSectionProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <motion.div 
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.3 
      }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardHeader className="text-center relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                    "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              {/* Cyber lock icon */}
              <motion.div
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center relative z-10"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(139, 92, 246, 0.7)",
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Lock className="h-8 w-8 text-white" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-white relative z-10">
                Secure Access
              </CardTitle>
              <CardDescription className="text-gray-300 relative z-10">
                Enter the vault to protect your digital identity
              </CardDescription>
            </CardHeader>
          </motion.div>
          
          <CardContent className="relative">
            <Tabs defaultValue="login" className="w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-700/50 border-gray-600">
                  <TabsTrigger 
                    value="login" 
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              
              <TabsContent value="login">
                <motion.form 
                  onSubmit={handleLogin} 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Enter Vault
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>
              
              <TabsContent value="signup">
                <motion.form 
                  onSubmit={handleLogin} 
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-300">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Create Account
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
