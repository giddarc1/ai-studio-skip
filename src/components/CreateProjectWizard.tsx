import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectData: any) => void;
}

export const CreateProjectWizard = ({ open, onOpenChange, onCreateProject }: CreateProjectWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    // Basic Info
    name: '',
    description: '',
    category: '',
    
    // Brief & Concept
    briefDescription: '',
    moodBoards: [] as File[],
    styleFrames: [] as File[],
    colorPalette: '',
    poses: [] as File[],
    locations: [] as File[],
    
    // Model Selection
    modelType: 'ai',
    selectedAIModels: [] as string[],
    uploadedModels: [] as File[],
    
    // Products
    products: [] as File[],
    productDescriptions: {} as Record<string, string>
  });

  const steps = [
    { id: 1, title: "Project Info", description: "Basic project details" },
    { id: 2, title: "Brief & Concept", description: "Define your vision" },
    { id: 3, title: "Model Selection", description: "Choose your models" },
    { id: 4, title: "Products Upload", description: "Upload product images" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateProject();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateProject = () => {
    onCreateProject({
      ...projectData,
      status: 'draft',
      workflow_step: 1
    });
    
    // Reset form
    setProjectData({
      name: '',
      description: '',
      category: '',
      briefDescription: '',
      moodBoards: [],
      styleFrames: [],
      colorPalette: '',
      poses: [],
      locations: [],
      modelType: 'ai',
      selectedAIModels: [],
      uploadedModels: [],
      products: [],
      productDescriptions: {}
    });
    setCurrentStep(1);
    onOpenChange(false);
  };

  const handleFileUpload = (files: FileList | null, category: string) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setProjectData(prev => ({
      ...prev,
      [category]: [...(prev[category as keyof typeof prev] as File[]), ...fileArray]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return projectData.name.trim() && projectData.category;
      case 2:
        return projectData.briefDescription.trim();
      case 3:
        return projectData.modelType === 'ai' 
          ? projectData.selectedAIModels.length > 0
          : projectData.uploadedModels.length > 0;
      case 4:
        return projectData.products.length > 0;
      default:
        return false;
    }
  };

  const FileUploadSection = ({ 
    title, 
    description, 
    accept, 
    category, 
    files 
  }: { 
    title: string;
    description: string;
    accept: string;
    category: string;
    files: File[];
  }) => (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
        <Input
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFileUpload(e.target.files, category)}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        {files.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {files.map((file, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {file.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up your new photoshoot project with our guided workflow
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-4">
          <Progress value={(currentStep / 4) * 100} className="h-2" />
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep ? 'bg-green-500 text-white' :
                  step.id === currentStep ? 'bg-primary text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <p className="text-xs font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={projectData.name}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your project"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={projectData.category} onValueChange={(value) => setProjectData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="briefDescription">Creative Brief *</Label>
                <Textarea
                  id="briefDescription"
                  value={projectData.briefDescription}
                  onChange={(e) => setProjectData(prev => ({ ...prev, briefDescription: e.target.value }))}
                  placeholder="Describe your photoshoot concept, target audience, and creative vision..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadSection
                  title="Mood Boards"
                  description="Upload inspiration images and mood boards"
                  accept="image/*"
                  category="moodBoards"
                  files={projectData.moodBoards}
                />

                <FileUploadSection
                  title="Style Frames"
                  description="Reference images for styling and composition"
                  accept="image/*"
                  category="styleFrames"
                  files={projectData.styleFrames}
                />

                <FileUploadSection
                  title="Sample Poses"
                  description="Reference poses and expressions"
                  accept="image/*"
                  category="poses"
                  files={projectData.poses}
                />

                <FileUploadSection
                  title="Location Inspiration"
                  description="Background and location references"
                  accept="image/*"
                  category="locations"
                  files={projectData.locations}
                />
              </div>

              <div>
                <Label htmlFor="colorPalette">Color Palette</Label>
                <Input
                  id="colorPalette"
                  value={projectData.colorPalette}
                  onChange={(e) => setProjectData(prev => ({ ...prev, colorPalette: e.target.value }))}
                  placeholder="Describe your color palette (e.g., warm earth tones, vibrant blues)"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Model Type</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={projectData.modelType === 'ai' ? 'default' : 'outline'}
                    onClick={() => setProjectData(prev => ({ ...prev, modelType: 'ai' }))}
                  >
                    AI Models
                  </Button>
                  <Button
                    variant={projectData.modelType === 'real' ? 'default' : 'outline'}
                    onClick={() => setProjectData(prev => ({ ...prev, modelType: 'real' }))}
                  >
                    Real Models
                  </Button>
                </div>
              </div>

              {projectData.modelType === 'ai' ? (
                <div>
                  <Label>Available AI Models</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {['Fashion Model A', 'Fashion Model B', 'Lifestyle Model A', 'Lifestyle Model B'].map((model) => (
                      <Card 
                        key={model} 
                        className={`cursor-pointer transition-colors ${
                          projectData.selectedAIModels.includes(model) ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          setProjectData(prev => ({
                            ...prev,
                            selectedAIModels: prev.selectedAIModels.includes(model)
                              ? prev.selectedAIModels.filter(m => m !== model)
                              : [...prev.selectedAIModels, model]
                          }));
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                            <div className="text-lg">👤</div>
                          </div>
                          <p className="text-sm font-medium">{model}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <FileUploadSection
                  title="Model Photos"
                  description="Upload photos of real models to be used in the photoshoot"
                  accept="image/*"
                  category="uploadedModels"
                  files={projectData.uploadedModels}
                />
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <FileUploadSection
                title="Product Images"
                description="Upload product photos with white/transparent backgrounds"
                accept="image/*"
                category="products"
                files={projectData.products}
              />

              {projectData.products.length > 0 && (
                <div className="space-y-4">
                  <Label>Product Descriptions (Optional)</Label>
                  {projectData.products.map((file, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Badge variant="outline" className="min-w-0 flex-shrink-0">
                        {file.name}
                      </Badge>
                      <Input
                        placeholder="Brief description of this product..."
                        value={projectData.productDescriptions[file.name] || ''}
                        onChange={(e) => setProjectData(prev => ({
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
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? 'Create Project' : 'Next'}
            {currentStep < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};