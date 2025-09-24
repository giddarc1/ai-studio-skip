import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Zap, ArrowRight } from "lucide-react";
import heroJewelryBanner from "@/assets/hero-jewelry-banner.jpg";
import jewelryAfter from "@/assets/jewelry-after.jpg";
import apparelAfter from "@/assets/apparel-after.jpg";
import accessoriesAfter from "@/assets/accessories-after.jpg";
import electronicsAfter from "@/assets/electronics-after.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Background Image - Right Side Only */}
      <div 
        className="absolute top-0 right-0 w-3/5 h-full bg-cover bg-left bg-no-repeat"
        style={{ backgroundImage: `url(${heroJewelryBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background/60" />
      </div>
      
      {/* Left Content Area with Solid Background */}
      <div className="absolute top-0 left-0 w-2/5 h-full bg-background" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="grid grid-cols-5 gap-12 items-center w-full">
          {/* Left Column - Main Content (Takes 2 columns) */}
          <div className="col-span-2 space-y-8 pr-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-premium/15 border border-premium/30 rounded-full px-6 py-3 backdrop-blur-md animate-fade-in shadow-lg">
              <Sparkles className="w-5 h-5 text-premium" />
              <span className="text-sm font-semibold text-premium">AI-Powered Studio</span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-in delay-200">
              <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
                <span className="block text-foreground mb-2">Next-Gen</span>
                <span className="block bg-gradient-to-r from-premium to-accent bg-clip-text text-transparent mb-2">
                  Product Photography
                </span>
                <span className="block text-foreground text-3xl lg:text-4xl font-light">
                  —No Studio Required
                </span>
              </h1>
            </div>
            
            {/* Subheadline */}
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed animate-fade-in delay-400">
              Turn everyday product shots into stunning marketing visuals—AI-powered and a fraction of photoshoot costs.
            </p>

            {/* Stats Row */}
            <div className="flex gap-6 animate-fade-in delay-500">
              <div className="text-left">
                <div className="text-2xl font-bold text-premium">10X</div>
                <div className="text-xs text-muted-foreground">Faster</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-accent">90%</div>
                <div className="text-xs text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-premium">24/7</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col gap-4 animate-fade-in delay-600">
              <Button size="lg" className="bg-gradient-premium hover:shadow-premium text-premium-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300 group w-fit">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating Images
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 px-8 py-4 text-lg font-semibold w-fit">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Area - Image Showcase (Takes 3 columns) */}
          <div className="col-span-3 relative h-full flex items-center justify-end">
            {/* Minimal floating accents */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-premium/40 rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-accent/40 rounded-full animate-pulse delay-1000" />
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-muted-foreground">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-accent/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;