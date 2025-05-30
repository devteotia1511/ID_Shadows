import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentUpload } from "@/components/DocumentUpload";
import { PIIAnalysis } from "@/components/PIIAnalysis";
import { PrivacyHeatmap } from "@/components/PrivacyHeatmap";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import { PhishingDetector } from "@/components/PhishingDetector";
import { WebsiteAnalyzer } from "@/components/WebsiteAnalyzer";
import { PrivacyReportCard } from "@/components/PrivacyReportCard";
import { DarkWebScanner } from "@/components/DarkWebScanner";
import { PrivacyQuiz } from "@/components/PrivacyQuiz";
import { DocumentRedaction } from "@/components/DocumentRedaction";
import { PrivacyAssistant } from "@/components/PrivacyAssistant";
import { AuthSection } from "@/components/AuthSection";
import { Header } from "@/components/Header";
import { Shield, FileText, Globe, Eye, Sparkles, Search, Lock, AlertTriangle, Bot, Scan, MessageCircle, Database, Trophy, Brain } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"upload" | "website" | "phishing" | "scanner" | "quiz" | "assistant">("upload");
  const [extractedText, setExtractedText] = useState<string>("");
  const [detectedPII, setDetectedPII] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Privacy Risk Heatmap",
      description: "Visualize PII risks with color-coded threat levels in your documents",
      color: "from-red-500 to-pink-600",
      delay: 0.1
    },
    {
      icon: Bot,
      title: "AI Sharing Suggestions",
      description: "Get intelligent recommendations on what's safe to share",
      color: "from-blue-500 to-cyan-600",
      delay: 0.2
    },
    {
      icon: Search,
      title: "Phishing Detector",
      description: "Analyze websites and forms for potential phishing threats",
      color: "from-purple-500 to-indigo-600",
      delay: 0.3
    },
    {
      icon: FileText,
      title: "Privacy Report Card",
      description: "Generate comprehensive privacy assessments and reports",
      color: "from-emerald-500 to-teal-600",
      delay: 0.4
    },
    {
      icon: Database,
      title: "Dark Web Scanner",
      description: "Check if your data has been compromised in breaches",
      color: "from-orange-500 to-red-600",
      delay: 0.5
    },
    {
      icon: Lock,
      title: "Document Redaction",
      description: "Automatically hide sensitive information before sharing",
      color: "from-yellow-500 to-orange-600",
      delay: 0.6
    },
    {
      icon: Brain,
      title: "Privacy Quiz",
      description: "Test your cybersecurity knowledge with interactive challenges",
      color: "from-pink-500 to-rose-600",
      delay: 0.7
    },
    {
      icon: MessageCircle,
      title: "Privacy Assistant",
      description: "AI-powered chatbot for instant cybersecurity guidance",
      color: "from-violet-500 to-purple-600",
      delay: 0.8
    }
  ];

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 3, -3, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.5)",
        "0 0 40px rgba(139, 92, 246, 0.7)",
        "0 0 20px rgba(59, 130, 246, 0.5)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Animated cyber grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        {/* Floating cyber particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="container mx-auto px-4 py-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* 3D Cyber Shield */}
            <motion.div 
              className="flex items-center justify-center mb-12"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div 
                className="relative"
                variants={glowVariants}
                animate="animate"
              >
                <div className="p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl relative">
                  <Shield className="h-20 w-20 text-white" />
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Floating data elements */}
                {[Lock, Eye, AlertTriangle, Scan].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center border border-blue-500"
                    style={{
                      top: index % 2 === 0 ? '-20px' : 'auto',
                      bottom: index % 2 === 1 ? '-20px' : 'auto',
                      left: index < 2 ? '-30px' : 'auto',
                      right: index >= 2 ? '-30px' : 'auto',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <Icon className="h-4 w-4 text-blue-400" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Identity Vault
              </span>
            </motion.h1>
            
            <motion.div
              className="text-4xl md:text-5xl font-bold text-white mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-red-400">Don't get hacked.</span>
              <br />
              <span className="text-green-400">Get protected.</span>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Advanced AI-powered cybersecurity platform that protects your digital identity, 
              detects threats, and keeps your personal information secure in the digital world.
            </motion.p>
          </motion.div>

          {/* Floating Feature Cards */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: feature.delay }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                className="group perspective-1000"
              >
                <motion.div 
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700 hover:border-blue-500 transition-all duration-500 transform-gpu"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <motion.div 
                    className={`p-4 bg-gradient-to-r ${feature.color} rounded-xl w-fit mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <AuthSection onLogin={() => setIsAuthenticated(true)} />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header onLogout={() => setIsAuthenticated(false)} />
      
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="mb-8" layout>
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-3xl p-2 shadow-2xl w-fit mx-auto border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "upload"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Document Analysis
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("website")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "website"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Website Safety
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("phishing")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "phishing"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Phishing Detector
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("scanner")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "scanner"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dark Web Scanner
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("quiz")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Quiz
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("assistant")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm ${
                activeTab === "assistant"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Assistant
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "upload" ? (
            <motion.div 
              key="upload"
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <DocumentUpload 
                    onTextExtracted={setExtractedText}
                    onPIIDetected={setDetectedPII}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PIIAnalysis 
                    extractedText={extractedText}
                    detectedPII={detectedPII}
                  />
                </motion.div>
              </div>

              {extractedText && detectedPII.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <PrivacyHeatmap 
                      extractedText={extractedText}
                      detectedPII={detectedPII}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <SmartSuggestions detectedPII={detectedPII} />
                  </motion.div>
                </div>
              )}

              {extractedText && detectedPII.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <PrivacyReportCard 
                      extractedText={extractedText}
                      detectedPII={detectedPII}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <DocumentRedaction 
                      extractedText={extractedText}
                      detectedPII={detectedPII}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : activeTab === "website" ? (
            <motion.div
              key="website"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <WebsiteAnalyzer />
            </motion.div>
          ) : activeTab === "phishing" ? (
            <motion.div
              key="phishing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PhishingDetector />
            </motion.div>
          ) : activeTab === "scanner" ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <DarkWebScanner />
            </motion.div>
          ) : activeTab === "quiz" ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PrivacyQuiz />
            </motion.div>
          ) : (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PrivacyAssistant />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
