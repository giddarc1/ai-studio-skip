import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Zap, ArrowRight } from "lucide-react";
import heroComparison from "@/assets/hero-comparison.jpg";
import jewelryAfter from "@/assets/jewelry-after.jpg";
import apparelAfter from "@/assets/apparel-after.jpg";
import accessoriesAfter from "@/assets/accessories-after.jpg";
import electronicsAfter from "@/assets/electronics-after.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${heroComparison})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>
      
      {/* Additional Text Background for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-transparent lg:from-background/20" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Main Content */}
          <div className="space-y-8 bg-background/20 backdrop-blur-sm rounded-3xl p-8 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background/90 border border-premium/30 rounded-full px-6 py-3 backdrop-blur-md animate-fade-in shadow-lg">
              <Sparkles className="w-5 h-5 text-premium" />
              <span className="text-sm font-semibold text-premium">AI-Powered Studio</span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-in delay-200">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                <span className="block text-foreground mb-2 drop-shadow-sm">Next-Gen</span>
                <span className="block bg-gradient-to-r from-premium to-accent bg-clip-text text-transparent mb-2 drop-shadow-sm">
                  Product Photography
                </span>
                <span className="block text-foreground text-3xl sm:text-4xl lg:text-5xl font-light drop-shadow-sm">
                  —No Studio Required
                </span>
              </h1>
            </div>
            
            {/* Subheadline */}
            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in delay-400 drop-shadow-sm">
                Transform ordinary product photos into stunning marketing visuals with AI. Perfect for jewelry, apparel, and consumer brands—at a fraction of traditional photoshoot costs.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex justify-start gap-6 sm:gap-8 animate-fade-in delay-500">
              <div className="text-left bg-background/70 backdrop-blur-sm rounded-xl p-3 lg:bg-transparent lg:backdrop-blur-none">
                <div className="text-2xl sm:text-3xl font-bold text-premium drop-shadow-sm">10X</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Faster</div>
              </div>
              <div className="text-left bg-background/70 backdrop-blur-sm rounded-xl p-3 lg:bg-transparent lg:backdrop-blur-none">
                <div className="text-2xl sm:text-3xl font-bold text-accent drop-shadow-sm">90%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-left bg-background/70 backdrop-blur-sm rounded-xl p-3 lg:bg-transparent lg:backdrop-blur-none">
                <div className="text-2xl sm:text-3xl font-bold text-premium drop-shadow-sm">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Available</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-600">
              <Button size="lg" className="bg-gradient-premium hover:shadow-premium text-premium-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300 group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating Images
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-md border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 px-8 py-4 text-base sm:text-lg font-semibold shadow-lg">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Let the background image show */}
          <div className="relative lg:block hidden">
            {/* Minimal floating elements to not compete with the background */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-premium/60 rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-accent/60 rounded-full animate-pulse delay-1000" />
              <div className="absolute top-1/2 right-1/6 w-4 h-4 bg-premium/40 rounded-full animate-pulse delay-2000" />
            </div>

            {/* Examples panel */}
            <div className="absolute bottom-8 right-8">
              <div className="grid grid-cols-2 gap-3 bg-background/70 backdrop-blur-md p-3 rounded-2xl border border-border/50 shadow-hero">
                <img src={jewelryAfter} alt="AI-generated jewelry product image example" className="w-28 h-20 object-cover rounded-lg border border-border/50 shadow-card" loading="lazy" />
                <img src={apparelAfter} alt="AI-generated apparel product image example" className="w-28 h-20 object-cover rounded-lg border border-border/50 shadow-card" loading="lazy" />
                <img src={accessoriesAfter} alt="AI-generated accessories product image example" className="w-28 h-20 object-cover rounded-lg border border-border/50 shadow-card" loading="lazy" />
                <img src={electronicsAfter} alt="AI-generated electronics product image example" className="w-28 h-20 object-cover rounded-lg border border-border/50 shadow-card" loading="lazy" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-right">Multiple AI‑enhanced examples</p>
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