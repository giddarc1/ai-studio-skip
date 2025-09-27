import { useState } from 'react';
import { ImageGenerationService, GenerationRequest } from '@/lib/imageGeneration';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const generateImages = async (
    generationType: GenerationRequest['generation_type'], 
    inputData: any,
    files?: FileList | null
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use image generation features.",
        variant: "destructive"
      });
      return null;
    }

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      // Handle file uploads first
      const uploadedFiles: Record<string, string> = {};
      
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const path = await ImageGenerationService.uploadFile(file, user.id);
          if (path) {
            uploadedFiles[file.name] = ImageGenerationService.getPublicUrl(path);
          }
        }
      }

      // Merge uploaded file URLs with input data
      const processedInputData = {
        ...inputData,
        ...uploadedFiles,
        userId: user.id
      };

      // Create generation request
      const requestId = await ImageGenerationService.createRequest({
        generation_type: generationType,
        input_data: processedInputData
      });

      if (!requestId) {
        throw new Error('Failed to create generation request');
      }

      toast({
        title: "Generation started",
        description: "Your images are being generated. This may take a few moments.",
      });

      // Process the generation
      const result = await ImageGenerationService.processGeneration(
        requestId, 
        generationType, 
        processedInputData
      );

      if (result?.success) {
        // Extract images from result
        let images: any[] = [];
        
        if (result.data?.generatedImages) {
          images = result.data.generatedImages;
        } else if (result.data?.processedImage) {
          images = [result.data.processedImage];
        } else if (result.data?.modelShots) {
          images = result.data.modelShots;
        } else if (result.data?.campaignShots) {
          images = result.data.campaignShots;
        } else if (result.data?.result) {
          images = [result.data.result];
        }

        setGeneratedImages(images);
        
        toast({
          title: "Images generated successfully!",
          description: `Generated ${images.length} image${images.length !== 1 ? 's' : ''} in ${result.data?.processingTime || 'a few seconds'}.`,
        });

        return { success: true, images, requestId };
      }

    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setIsGenerating(false);
    }
  };

  const getUserHistory = async () => {
    if (!user) return [];
    
    try {
      const history = await ImageGenerationService.getUserRequests(user.id);
      return history;
    } catch (error) {
      console.error('Error fetching user history:', error);
      return [];
    }
  };

  return {
    isGenerating,
    generatedImages,
    generateImages,
    getUserHistory,
    setGeneratedImages
  };
};