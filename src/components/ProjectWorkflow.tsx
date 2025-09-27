import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Users, 
  Package, 
  Wand2, 
  Upload, 
  Image as ImageIcon, 
  Palette, 
  MapPin,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectWorkflowProps {
  projectId: string;
  currentStep: number;
  onStepComplete: (step: number, data: any) => void;
}

export const ProjectWorkflow = ({ projectId, currentStep, onStepComplete }: ProjectWorkflowProps) => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(currentStep);
  
  // Step 1: Brief and Concept Development
  const [briefData, setBriefData] = useState({
    description: '',
    moodBoards: [] as File[],
    styleFrames: [] as File[],
    colorPalette: '',
    poses: [] as File[],
    locations: [] as File[]
  });

  // Step 2: Model Selection
  const [modelData, setModelData] = useState({
    modelType: 'ai', // 'ai' or 'real'
    selectedAIModels: [] as string[],
    uploadedModels: [] as File[]
  });

  // Step 3: Products Upload
  const [productData, setProductData] = useState({
    products: [] as File[],
    productDescriptions: {} as Record<string, string>
  });

  // Step 4: Generate and Edit
  const [generationData, setGenerationData] = useState({
    generatedImages: [] as string[],
    selectedForEdit: [] as string[],
    editPrompts: {} as Record<string, string>
  });

  const steps = [
    {
      id: 1,
      title: "Brief & Concept",
      description: "Define project vision and upload inspiration",
      icon: FileText,
      status: activeStep > 1 ? 'completed' : activeStep === 1 ? 'active' : 'pending'
    },
    {
      id: 2,
      title: "Model Selection",
      description: "Choose AI models or upload model photos",
      icon: Users,
      status: activeStep > 2 ? 'completed' : activeStep === 2 ? 'active' : 'pending'
    },
    {
      id: 3,
      title: "Products Upload",
      description: "Upload product images on white background",
      icon: Package,
      status: activeStep > 3 ? 'completed' : activeStep === 3 ? 'active' : 'pending'
    },
    {
      id: 4,
      title: "Generate & Edit",
      description: "Create photoshoot images and refine",
      icon: Wand2,
      status: activeStep > 4 ? 'completed' : activeStep === 4 ? 'active' : 'pending'
    }
  ];

  const handleFileUpload = (files: FileList | null, category: string, step: number) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    
    // In real implementation, these would be uploaded to Supabase Storage
    toast({
      title: "Files Uploaded",
      description: `${fileArray.length} files uploaded for ${category}`,
    });

    // Update state based on step and category
    if (step === 1) {
      setBriefData(prev => ({
        ...prev,
        [category]: [...prev[category as keyof typeof prev] as File[], ...fileArray]
      }));
    } else if (step === 2) {
      setModelData(prev => ({
        ...prev,
        uploadedModels: [...prev.uploadedModels, ...fileArray]
      }));
    } else if (step === 3) {
      setProductData(prev => ({
        ...prev,
        products: [...prev.products, ...fileArray]
      }));
    }
  };

  const handleStepComplete = (step: number) => {
    let data: any;
    
    switch (step) {
      case 1:
        data = briefData;
        break;
      case 2:
        data = modelData;
        break;
      case 3:
        data = productData;
        break;
      case 4:
        data = generationData;
        break;
      default:
        data = {};
    }

    onStepComplete(step, data);
    
    toast({
      title: "Step Saved",
      description: `${steps[step - 1].title} saved successfully`,
    });
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const FileUploadCard = ({ 
    title, 
    description, 
    accept, 
    category, 
    step, 
    files 
  }: { 
    title: string;
    description: string;
    accept: string;
    category: string;
    step: number;
    files: File[];
  }) => (
    <Card className="border-dashed border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Input
            type="file"
            accept={accept}
            multiple
            onChange={(e) => handleFileUpload(e.target.files, category, step)}
            className="cursor-pointer"
          />
          {files.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {files.map((file, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {file.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Project Workflow</h2>
          <Badge variant="outline">
            Step {activeStep} of 4
          </Badge>
        </div>
        
        <Progress value={(activeStep / 4) * 100} className="h-2" />
        
        <div className="grid grid-cols-4 gap-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setActiveStep(step.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepColor(step.status)}`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : step.status === 'active' ? (
                  <Clock className="h-4 w-4 text-white" />
                ) : (
                  <step.icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{step.title}</p>
                <p className="text-xs text-muted-foreground truncate">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Step Content */}
      <Tabs value={activeStep.toString()} onValueChange={(value) => setActiveStep(parseInt(value))} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1">Brief & Concept</TabsTrigger>
          <TabsTrigger value="2">Model Selection</TabsTrigger>
          <TabsTrigger value="3">Products Upload</TabsTrigger>
          <TabsTrigger value="4">Generate & Edit</TabsTrigger>
        </TabsList>
        {/* Step 1: Brief and Concept Development */}
        <TabsContent value="1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Brief & Concept Development
              </CardTitle>
              <CardDescription>
                Define your project vision and upload inspiration materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your photoshoot concept, target audience, and creative vision..."
                  value={briefData.description}
                  onChange={(e) => setBriefData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadCard
                  title="Mood Boards"
                  description="Upload inspiration images and mood boards"
                  accept="image/*"
                  category="moodBoards"
                  step={1}
                  files={briefData.moodBoards}
                />

                <FileUploadCard
                  title="Style Frames"
                  description="Reference images for styling and composition"
                  accept="image/*"
                  category="styleFrames"
                  step={1}
                  files={briefData.styleFrames}
                />

                <FileUploadCard
                  title="Sample Poses"
                  description="Reference poses and expressions"
                  accept="image/*"
                  category="poses"
                  step={1}
                  files={briefData.poses}
                />

                <FileUploadCard
                  title="Location Inspiration"
                  description="Background and location references"
                  accept="image/*"
                  category="locations"
                  step={1}
                  files={briefData.locations}
                />
              </div>

              <div>
                <Label htmlFor="colorPalette">Color Palette</Label>
                <Input
                  id="colorPalette"
                  placeholder="Describe your color palette (e.g., warm earth tones, vibrant blues, monochromatic)"
                  value={briefData.colorPalette}
                  onChange={(e) => setBriefData(prev => ({ ...prev, colorPalette: e.target.value }))}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleStepComplete(1)} 
                  className="flex-1"
                  disabled={!briefData.description.trim()}
                >
                  Save & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {activeStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {activeStep < 4 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Model Selection */}
        <TabsContent value="2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Model Selection
              </CardTitle>
              <CardDescription>
                Choose AI models or upload real model photos for your photoshoot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Model Type</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={modelData.modelType === 'ai' ? 'default' : 'outline'}
                    onClick={() => setModelData(prev => ({ ...prev, modelType: 'ai' }))}
                  >
                    AI Models
                  </Button>
                  <Button
                    variant={modelData.modelType === 'real' ? 'default' : 'outline'}
                    onClick={() => setModelData(prev => ({ ...prev, modelType: 'real' }))}
                  >
                    Real Models
                  </Button>
                </div>
              </div>

              {modelData.modelType === 'ai' ? (
                <div>
                  <Label>Available AI Models</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {['Fashion Model A', 'Fashion Model B', 'Lifestyle Model A', 'Lifestyle Model B'].map((model) => (
                      <Card 
                        key={model} 
                        className={`cursor-pointer transition-colors ${
                          modelData.selectedAIModels.includes(model) ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          setModelData(prev => ({
                            ...prev,
                            selectedAIModels: prev.selectedAIModels.includes(model)
                              ? prev.selectedAIModels.filter(m => m !== model)
                              : [...prev.selectedAIModels, model]
                          }));
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium">{model}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <FileUploadCard
                  title="Model Photos"
                  description="Upload photos of real models to be used in the photoshoot"
                  accept="image/*"
                  category="uploadedModels"
                  step={2}
                  files={modelData.uploadedModels}
                />
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleStepComplete(2)} 
                  className="flex-1"
                  disabled={
                    modelData.modelType === 'ai' 
                      ? modelData.selectedAIModels.length === 0
                      : modelData.uploadedModels.length === 0
                  }
                >
                  Save & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {activeStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {activeStep < 4 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Products Upload */}
        <TabsContent value="3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Products Upload
              </CardTitle>
              <CardDescription>
                Upload your product images on white background for processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUploadCard
                title="Product Images"
                description="Upload product photos with white/transparent backgrounds"
                accept="image/*"
                category="products"
                step={3}
                files={productData.products}
              />

              {productData.products.length > 0 && (
                <div className="space-y-4">
                  <Label>Product Descriptions (Optional)</Label>
                  {productData.products.map((file, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Badge variant="outline" className="min-w-0 flex-shrink-0">
                        {file.name}
                      </Badge>
                      <Input
                        placeholder="Brief description of this product..."
                        value={productData.productDescriptions[file.name] || ''}
                        onChange={(e) => setProductData(prev => ({
                          ...prev,
                          productDescriptions: {
                            ...prev.productDescriptions,
                            [file.name]: e.target.value
                          }
                        }))}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleStepComplete(3)} 
                  className="flex-1"
                  disabled={productData.products.length === 0}
                >
                  Save & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {activeStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {activeStep < 4 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Generate and Edit */}
        <TabsContent value="4" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generate & Edit
              </CardTitle>
              <CardDescription>
                Generate photoshoot images and refine them with AI editing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-premium hover:opacity-90 text-white"
                  onClick={() => {
                    toast({
                      title: "Generating Images",
                      description: "AI is creating your photoshoot images...",
                    });
                    // In real implementation, this would trigger AI generation
                  }}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Photoshoot Images
                </Button>
              </div>

              {/* Generated images would appear here */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Placeholder for generated images */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="aspect-square">
                    <CardContent className="p-0 h-full flex items-center justify-center bg-muted">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleStepComplete(4)} 
                  className="flex-1"
                >
                  Complete Project
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
                {activeStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};