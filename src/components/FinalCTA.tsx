import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-premium relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-premium-foreground mb-6 leading-tight">
            Ready to skip the studio?
          </h2>
          
          <p className="text-xl text-premium-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of brands creating stunning product photography with AI. 
            Start your free trial today and transform your visual content strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-foreground hover:bg-white/90 px-10 py-4 text-lg font-semibold shadow-lg"
            >
              Get Started for Free
            </Button>
            
            <p className="text-premium-foreground/80 text-sm">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-premium-foreground/20">
            <p className="text-premium-foreground/70 text-sm mb-4">
              Trusted by leading brands worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Placeholder for brand logos */}
              <div className="h-8 w-24 bg-premium-foreground/20 rounded" />
              <div className="h-8 w-24 bg-premium-foreground/20 rounded" />
              <div className="h-8 w-24 bg-premium-foreground/20 rounded" />
              <div className="h-8 w-24 bg-premium-foreground/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;