
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the most secure way to share sensitive documents?",
    options: [
      "Email attachment",
      "Cloud storage with password protection",
      "Encrypted file sharing platform",
      "Social media private message"
    ],
    correct: 2,
    explanation: "Encrypted file sharing platforms provide end-to-end encryption, ensuring only authorized recipients can access your sensitive documents."
  },
  {
    id: 2,
    question: "Which information should NEVER be shared on social media?",
    options: [
      "Your favorite food",
      "Government ID numbers",
      "Your hobby interests",
      "Travel photos (after returning)"
    ],
    correct: 1,
    explanation: "Government ID numbers can be used for identity theft and should never be shared publicly on any platform."
  },
  {
    id: 3,
    question: "What is a red flag for phishing emails?",
    options: [
      "Personalized greeting with your name",
      "Urgent language demanding immediate action",
      "Professional email design",
      "Links to official websites"
    ],
    correct: 1,
    explanation: "Phishing emails often create false urgency to pressure you into acting without thinking carefully about the request."
  }
];

export const PrivacyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (quizCompleted) {
    return (
      <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
        <CardContent className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <div className={`text-4xl font-bold ${getScoreColor()} mb-4`}>
              {score}/{quizQuestions.length}
            </div>
            <p className="text-gray-300 mb-6">
              {score === quizQuestions.length 
                ? "Perfect! You're a cybersecurity expert!" 
                : score >= quizQuestions.length * 0.6 
                ? "Good job! Keep learning to improve your security knowledge." 
                : "Consider reviewing cybersecurity best practices to better protect yourself."}
            </p>
            <Button onClick={restartQuiz} className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
              Take Quiz Again
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <motion.div 
            className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(236, 72, 153, 0.5)",
                "0 0 30px rgba(225, 29, 72, 0.7)",
                "0 0 20px rgba(236, 72, 153, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Brain className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-white">Privacy Literacy Quiz</span>
        </CardTitle>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswer === index
                        ? "bg-blue-600/20 border-blue-400 text-blue-200"
                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
              >
                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              {selectedAnswer === quizQuestions[currentQuestion].correct ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              )}
              
              <h3 className={`text-xl font-bold ${
                selectedAnswer === quizQuestions[currentQuestion].correct ? "text-green-400" : "text-red-400"
              }`}>
                {selectedAnswer === quizQuestions[currentQuestion].correct ? "Correct!" : "Incorrect"}
              </h3>
              
              <p className="text-gray-300">
                {quizQuestions[currentQuestion].explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
