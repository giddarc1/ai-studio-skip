import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BeforeAfterGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock data - you would replace these with actual before/after images
  const examples = [
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      category: "Jewelry"
    },
    {
      before: "/placeholder.svg", 
      after: "/placeholder.svg",
      category: "Apparel"
    },
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg", 
      category: "Accessories"
    },
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      category: "Electronics"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % examples.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch ordinary product photos become extraordinary marketing assets
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-hero">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {examples.map((example, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Before */}
                    <div className="relative bg-gray-100 aspect-square">
                      <img 
                        src={example.before} 
                        alt="Original product photo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Original
                        </span>
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="relative bg-gradient-accent aspect-square">
                      <img 
                        src={example.after} 
                        alt="AI-enhanced product photo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-premium text-premium-foreground px-3 py-1 rounded-full text-sm font-medium">
                          AI-Generated
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category label */}
                  <div className="text-center py-4">
                    <span className="text-accent font-semibold text-lg">
                      {example.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {examples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-accent' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;