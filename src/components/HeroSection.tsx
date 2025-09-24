import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Zap } from "lucide-react";
import heroComparison from "@/assets/hero-comparison.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroComparison})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80" />
      </div>
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-premium/20 to-accent/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/20 to-premium/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse delay-2000" />
        
        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 animate-float">
          <Camera className="w-8 h-8 text-accent/40" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float delay-1000">
          <Sparkles className="w-6 h-6 text-premium/40" />
        </div>
        <div className="absolute top-1/2 right-10 animate-float delay-2000">
          <Zap className="w-7 h-7 text-accent/40" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-premium/10 border border-premium/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-premium" />
            <span className="text-sm font-medium text-premium">AI-Powered Studio</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 animate-fade-in delay-200">
            <span className="bg-gradient-to-r from-foreground via-accent to-premium bg-clip-text text-transparent">
              Next-Gen Product
            </span>
            <br />
            <span className="text-foreground">Photography—</span>
            <br />
            <span className="text-accent font-light italic">No Studio Required</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-400">
            Create stunning visuals for jewelry, apparel, and more—at a fraction of traditional photoshoot costs.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in delay-600">
            <Button size="lg" className="bg-gradient-premium hover:shadow-premium text-premium-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Images
            </Button>
            
            <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in delay-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-premium mb-2">10X</div>
              <div className="text-sm text-muted-foreground">Faster Production</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Always Available</div>
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