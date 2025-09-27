import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      productImage, 
      productType, 
      productDimensions, 
      styleSelection,
      modelType = 'ai' // 'ai' or 'real'
    } = await req.json()

    console.log('Generating model shots with:', {
      productType,
      productDimensions,
      styleSelection,
      modelType
    })

    // Simulate AI model generation
    const modelShots = Array.from({ length: 3 }, (_, i) => ({
      id: `model_shot_${Date.now()}_${i}`,
      url: `https://picsum.photos/600/800?random=${Date.now()}_${i}`,
      modelType,
      style: styleSelection,
      pose: ['front_view', 'side_view', 'action_pose'][i],
      productType,
      prompt: `${modelType === 'ai' ? 'AI-generated' : 'Realistic'} model wearing/using ${productType} in ${styleSelection} style, ${['front view', 'side view', 'action pose'][i]}`,
      timestamp: new Date().toISOString(),
      modelDetails: {
        age: modelType === 'ai' ? 'mid-20s' : 'varied',
        gender: 'mixed',
        ethnicity: 'diverse',
        pose: ['front_view', 'side_view', 'action_pose'][i]
      }
    }))

    return new Response(
      JSON.stringify({
        success: true,
        message: `${modelType === 'ai' ? 'AI' : 'Real'} model shots generated successfully`,
        data: {
          modelShots,
          processingTime: '5.2s',
          totalImages: modelShots.length,
          modelType,
          productIntegration: 'seamless'
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error generating model shots:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate model shots'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})