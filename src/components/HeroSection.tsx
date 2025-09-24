import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Zap, ArrowRight } from "lucide-react";
import heroComparison from "@/assets/hero-comparison.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${heroComparison})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-premium/15 border border-premium/30 rounded-full px-6 py-3 backdrop-blur-md animate-fade-in shadow-sm">
              <Sparkles className="w-5 h-5 text-premium" />
              <span className="text-sm font-semibold text-premium">AI-Powered Studio</span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-in delay-200">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                <span className="block text-foreground mb-2">Next-Gen</span>
                <span className="block bg-gradient-to-r from-premium to-accent bg-clip-text text-transparent mb-2">
                  Product Photography
                </span>
                <span className="block text-foreground text-3xl sm:text-4xl lg:text-5xl font-light">
                  —No Studio Required
                </span>
              </h1>
            </div>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in delay-400">
              Transform ordinary product photos into stunning marketing visuals with AI. Perfect for jewelry, apparel, and consumer brands—at a fraction of traditional photoshoot costs.
            </p>

            {/* Stats Row */}
            <div className="flex justify-start gap-6 sm:gap-8 animate-fade-in delay-500">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-premium">10X</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Faster</div>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent">90%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-premium">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Available</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-600">
              <Button size="lg" className="bg-gradient-premium hover:shadow-premium text-premium-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating Images
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 px-8 py-4 text-base sm:text-lg font-semibold backdrop-blur-md">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative lg:block hidden">
            {/* Floating Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-premium/20 to-accent/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-32 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-premium/20 rounded-full blur-xl animate-pulse delay-1000" />
              
              {/* Floating Icons */}
              <div className="absolute top-32 right-20 animate-float">
                <Camera className="w-8 h-8 text-accent/60" />
              </div>
              <div className="absolute bottom-40 left-16 animate-float delay-1000">
                <Sparkles className="w-6 h-6 text-premium/60" />
              </div>
              <div className="absolute top-1/2 right-8 animate-float delay-2000">
                <Zap className="w-7 h-7 text-accent/60" />
              </div>
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