
import { Shield, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onLogout: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  return (
    <motion.header 
      className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 shadow-xl sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(139, 92, 246, 0.7)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
            >
              <Shield className="h-6 w-6 text-white" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Smart Identity Vault
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onLogout} 
                variant="outline" 
                size="sm" 
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500"
              >
                Logout
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
