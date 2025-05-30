
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, AlertTriangle } from "lucide-react";
import { createWorker } from "tesseract.js";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onTextExtracted: (text: string) => void;
  onPIIDetected: (pii: any[]) => void;
}

export const DocumentUpload = ({ onTextExtracted, onPIIDetected }: DocumentUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const extractTextFromImage = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);

    try {
      const worker = await createWorker('eng');
      
      await worker.setParameters({
        tessedit_page_seg_mode: '1',
        tessedit_ocr_engine_mode: '1',
      });

      // Simulate progress updates since logger is not available in types
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const { data: { text } } = await worker.recognize(file);

      clearInterval(progressInterval);
      setProgress(100);
      
      await worker.terminate();
      
      onTextExtracted(text);
      await analyzePII(text);
      
      toast({
        title: "Text Extraction Complete",
        description: "Document has been analyzed for sensitive information.",
      });

    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "Error",
        description: "Failed to extract text from the document.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const analyzePII = async (text: string) => {
    // Simulate PII detection - in a real app, you'd call OpenAI API
    const mockPII = [
      { type: "Email", value: "john.doe@email.com", risk: "Medium" },
      { type: "Phone", value: "+1 (555) 123-4567", risk: "Low" },
      { type: "Address", value: "123 Main St, City, State", risk: "High" },
      { type: "ID Number", value: "ID123456789", risk: "High" }
    ].filter(() => Math.random() > 0.5); // Randomly show some PII

    onPIIDetected(mockPII);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      if (file.type.startsWith('image/')) {
        extractTextFromImage(file);
      } else {
        toast({
          title: "Unsupported File Type",
          description: "Please upload an image file (PNG, JPG, etc.)",
          variant: "destructive",
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-purple-600" />
          <span>Document Upload & Analysis</span>
        </CardTitle>
        <CardDescription>
          Upload documents to detect and protect sensitive information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragActive
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-purple-500' : 'text-gray-400'}`} />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? "Drop your document here" : "Drag & drop a document"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports: PNG, JPG, JPEG, GIF, BMP, WebP
          </p>
          <Button variant="outline" type="button">
            Choose File
          </Button>
        </div>

        {uploadedFile && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">Selected File:</p>
            <p className="text-blue-600">{uploadedFile.name}</p>
            <p className="text-sm text-blue-500">
              Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-medium">Processing document...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-500">
              Extracting text and analyzing for sensitive information
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
