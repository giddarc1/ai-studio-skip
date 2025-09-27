import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, Wand2, Eye } from "lucide-react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { GenerationRequest } from "@/lib/imageGeneration";

type GenerationType = 'plain_background' | 'background_replacement' | 'ai_model' | 'real_model' | 'campaign_shots' | 'prompt_generation';

interface ImageGenerationFormProps {
  generationType: GenerationType;
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
}

export const ImageGenerationForm: React.FC<ImageGenerationFormProps> = ({
  generationType,
  title,
  description,
  badge,
  icon: Icon
}) => {
  const { isGenerating, generatedImages, generateImages } = useImageGeneration();
  const [formData, setFormData] = useState<any>({});
  const [files, setFiles] = useState<FileList | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateImages(generationType, formData, files);
  };

  const renderFormFields = () => {
    switch (generationType) {
      case 'plain_background':
        return (
          <>
            <div>
              <Label htmlFor="product-image">Product Image</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <Input 
                type="color" 
                defaultValue="#ffffff"
                onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Lighting Style</Label>
              <Select onValueChange={(value) => handleInputChange('lightingStyle', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select lighting style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural Light</SelectItem>
                  <SelectItem value="studio">Studio Light</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="soft">Soft Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Number of Angles</Label>
              <Select onValueChange={(value) => handleInputChange('angleCount', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select angles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Angle</SelectItem>
                  <SelectItem value="3">3 Angles</SelectItem>
                  <SelectItem value="5">5 Angles</SelectItem>
                  <SelectItem value="8">8 Angles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'background_replacement':
        return (
          <>
            <div>
              <Label>Product Image</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Reference Background Image (Optional)</Label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleInputChange('referenceImage', e.target.files?.[0])}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Background Theme</Label>
              <Select onValueChange={(value) => handleInputChange('backgroundTheme', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Product Placement</Label>
              <Select onValueChange={(value) => handleInputChange('productPlacement', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select placement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="floating">Floating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'ai_model':
      case 'real_model':
        return (
          <>
            <div>
              <Label>Product Image</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Product Type</Label>
              <Select onValueChange={(value) => handleInputChange('productType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Product Dimensions</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input 
                  placeholder="Width (cm)" 
                  onChange={(e) => handleInputChange('width', e.target.value)}
                />
                <Input 
                  placeholder="Height (cm)" 
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
                <Input 
                  placeholder="Depth (cm)" 
                  onChange={(e) => handleInputChange('depth', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Style/Pose Selection</Label>
              <Select onValueChange={(value) => handleInputChange('styleSelection', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'campaign_shots':
        return (
          <>
            <div>
              <Label>Product Images</Label>
              <Input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleFileChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Campaign Reference Image</Label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleInputChange('campaignReference', e.target.files?.[0])}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Model Type</Label>
              <Select onValueChange={(value) => handleInputChange('modelType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI Model</SelectItem>
                  <SelectItem value="real">Real Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Campaign Style</Label>
              <Select onValueChange={(value) => handleInputChange('campaignStyle', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select campaign style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="christmas">Christmas</SelectItem>
                  <SelectItem value="valentines-day">Valentine's Day</SelectItem>
                  <SelectItem value="summer-sale">Summer Sale</SelectItem>
                  <SelectItem value="black-friday">Black Friday</SelectItem>
                  <SelectItem value="new-year">New Year</SelectItem>
                  <SelectItem value="spring-collection">Spring Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'prompt_generation':
        return (
          <>
            <div>
              <Label>Base Image (Optional)</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Generation Prompt</Label>
              <Textarea 
                className="mt-1 resize-none h-24"
                placeholder="Describe the image you want to generate or how you want to edit the existing image..."
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Style Preferences</Label>
              <Select onValueChange={(value) => handleInputChange('stylePreferences', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photorealistic">Photorealistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className="text-xs">{badge}</Badge>
            </div>
            <CardDescription className="text-base">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          
          <Button 
            type="submit"
            className="w-full bg-gradient-premium hover:opacity-90 text-white"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Images
              </>
            )}
          </Button>
        </form>

        {/* Generated Images Display */}
        {generatedImages.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <h4 className="font-semibold">Generated Results</h4>
              <Badge variant="outline">{generatedImages.length} images</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      Download
                    </Button>
                  </div>
                  {image.prompt && (
                    <div className="absolute bottom-2 left-2 right-2 bg-black/75 text-white text-xs p-2 rounded">
                      {image.prompt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};