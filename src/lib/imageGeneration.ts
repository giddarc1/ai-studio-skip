import { supabase } from './supabase';

export interface GenerationRequest {
  id?: string;
  generation_type: 'plain_background' | 'background_replacement' | 'ai_model' | 'real_model' | 'campaign_shots' | 'prompt_generation';
  input_data: any;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface GeneratedImage {
  id: string;
  image_url: string;
  prompt?: string;
  metadata?: any;
  created_at: string;
}

export class ImageGenerationService {
  
  // Upload file to Supabase Storage
  static async uploadFile(file: File, userId: string): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('image-generation')
      .upload(fileName, file);
    
    if (error) {
      console.error('Upload error:', error);
      return null;
    }
    
    return data.path;
  }
  
  // Get public URL for uploaded file
  static getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from('image-generation')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
  
  // Create generation request
  static async createRequest(request: GenerationRequest): Promise<string | null> {
    const { data, error } = await supabase
      .from('image_generation_requests')
      .insert([request])
      .select('id')
      .single();
    
    if (error) {
      console.error('Request creation error:', error);
      return null;
    }
    
    return data.id;
  }
  
  // Process generation request
  static async processGeneration(requestId: string, generationType: string, inputData: any) {
    try {
      // Update status to processing
      await supabase
        .from('image_generation_requests')
        .update({ status: 'processing' })
        .eq('id', requestId);
      
      const functionName = this.getFunctionName(generationType);
      const startTime = Date.now();
      
      // Call appropriate edge function
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: inputData
      });
      
      const processingTime = (Date.now() - startTime) / 1000;
      
      if (error) {
        // Update request with error
        await supabase
          .from('image_generation_requests')
          .update({ 
            status: 'failed',
            error_message: error.message,
            processing_time_seconds: processingTime
          })
          .eq('id', requestId);
        
        throw error;
      }
      
      // Store generated images
      if (data?.data?.generatedImages) {
        const images = data.data.generatedImages.map((img: any) => ({
          request_id: requestId,
          image_url: img.url,
          prompt: img.prompt,
          metadata: { ...img, processingTime }
        }));
        
        await supabase.from('generated_images').insert(images);
      } else if (data?.data?.processedImage) {
        // For single image results (background replacement, etc.)
        await supabase.from('generated_images').insert([{
          request_id: requestId,
          image_url: data.data.processedImage.url,
          prompt: data.data.processedImage.prompt,
          metadata: { ...data.data.processedImage, processingTime }
        }]);
      } else if (data?.data?.result) {
        // For prompt generation
        await supabase.from('generated_images').insert([{
          request_id: requestId,
          image_url: data.data.result.url,
          prompt: data.data.result.prompt,
          metadata: { ...data.data.result, processingTime }
        }]);
      }
      
      // Update request as completed
      await supabase
        .from('image_generation_requests')
        .update({ 
          status: 'completed',
          output_data: data.data,
          processing_time_seconds: processingTime,
          completed_at: new Date().toISOString()
        })
        .eq('id', requestId);
      
      return data;
      
    } catch (error) {
      console.error('Generation processing error:', error);
      throw error;
    }
  }
  
  // Get user's generation history
  static async getUserRequests(userId: string) {
    const { data, error } = await supabase
      .from('image_generation_requests')
      .select(`
        *,
        generated_images (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user requests:', error);
      return [];
    }
    
    return data;
  }
  
  // Helper to map generation type to function name
  private static getFunctionName(generationType: string): string {
    const functionMap: Record<string, string> = {
      'plain_background': 'generate-plain-background',
      'background_replacement': 'replace-background',
      'ai_model': 'generate-model-shots',
      'real_model': 'generate-model-shots',
      'campaign_shots': 'generate-campaign-shots',
      'prompt_generation': 'prompt-generation'
    };
    
    return functionMap[generationType] || 'generate-plain-background';
  }
}