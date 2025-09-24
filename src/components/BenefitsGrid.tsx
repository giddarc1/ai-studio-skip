import { DollarSign, Clock, Zap, Target, TrendingUp, Leaf } from "lucide-react";

const BenefitsGrid = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Cut Photoshoot Costs",
      description: "Reduce traditional photography expenses by up to 90%"
    },
    {
      icon: Clock,
      title: "Always-On Production 24/7",
      description: "Generate professional images anytime, anywhere"
    },
    {
      icon: Zap,
      title: "Infinite Creative Variations",
      description: "Endless backgrounds, lighting, and styling options"
    },
    {
      icon: Target,
      title: "Consistent Brand Look",
      description: "Maintain visual consistency across your entire catalog"
    },
    {
      icon: TrendingUp,
      title: "Scalable for Thousands of SKUs",
      description: "Handle massive product catalogs effortlessly"
    },
    {
      icon: Leaf,
      title: "Sustainable & Eco-friendly",
      description: "Reduce physical waste and carbon footprint"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose AI Photography?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your product photography workflow with cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-gradient-accent group-hover:bg-premium/10 transition-colors">
                  <benefit.icon className="h-8 w-8 text-accent group-hover:text-premium transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;