import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const CreateProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();
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

  // Redirect if not authenticated
  if (!loading && !user) {
    navigate('/sign-in');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      status: 'draft' as const,
      workflow_step: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_count: projectData.products.length
    };

    // In real implementation, this would save to Supabase
    console.log('Creating project:', newProject);
    
    toast({
      title: "Project Created",
      description: `${projectData.name} has been created successfully!`,
    });

    // Navigate to the new project
    navigate(`/projects/${newProject.id}`);
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  const handleFileUpload = (files: FileList | null, category: string) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setProjectData(prev => ({
      ...prev,
      [category]: [...(prev[category as keyof typeof prev] as File[]), ...fileArray]
    }));

    toast({
      title: "Files Uploaded",
      description: `${fileArray.length} files uploaded successfully`,
    });
  };

  const removeFile = (category: string, index: number) => {
    setProjectData(prev => ({
      ...prev,
      [category]: (prev[category as keyof typeof prev] as File[]).filter((_, i) => i !== index)
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
          <div className="flex flex-wrap gap-2 mt-3">
            {files.map((file, index) => (
              <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                <span className="truncate max-w-[120px]">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive/20"
                  onClick={() => removeFile(category, index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <title>Create New Project - Glo AI Studio</title>
      <meta name="description" content="Create a new AI-powered product photography project. Set up your brief, select models, and upload products." />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-6 py-8 mt-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Create New Project</h1>
              <p className="text-muted-foreground mt-1">
                Set up your new photoshoot project with our guided workflow
              </p>
            </div>
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="min-h-[500px]">
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
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={projectData.description}
                          onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Brief description of your project"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={projectData.category} onValueChange={(value) => setProjectData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger className="mt-1">
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
                        className="min-h-[100px] mt-1"
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
                        className="mt-1"
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
                              className={`cursor-pointer transition-colors hover:shadow-md ${
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
                                {projectData.selectedAIModels.includes(model) && (
                                  <CheckCircle className="h-4 w-4 text-primary mx-auto mt-2" />
                                )}
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
                              <span className="truncate max-w-[150px]">{file.name}</span>
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
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
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
              className="bg-gradient-premium hover:opacity-90 text-white"
            >
              {currentStep === 4 ? 'Create Project' : 'Next'}
              {currentStep < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateProject;