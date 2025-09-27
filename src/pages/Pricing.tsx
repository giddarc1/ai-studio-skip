import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "month",
      description: "Perfect for small businesses and individuals",
      icon: Sparkles,
      features: [
        "Up to 500 AI-generated images per month",
        "Basic background removal",
        "Standard templates",
        "Email support",
        "HD image exports",
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$49",
      period: "month",
      description: "Ideal for growing businesses and teams",
      icon: Zap,
      features: [
        "Up to 2,000 AI-generated images per month",
        "Advanced background replacement",
        "Premium templates & styles",
        "Priority support",
        "4K image exports",
        "Batch processing",
        "API access",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "month",
      description: "For large teams and agencies",
      icon: Crown,
      features: [
        "Unlimited AI-generated images",
        "Custom model training",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
        "Team collaboration tools",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <>
      {/* SEO meta tags */}
      <title>Pricing Plans | Glo AI Studio - AI Product Photography</title>
      <meta name="description" content="Choose the perfect plan for your AI product photography needs. From starter to enterprise, find pricing that scales with your business." />
      
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial with no credit card required.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon;
                return (
                  <Card 
                    key={plan.name} 
                    className={`relative ${
                      plan.popular 
                        ? "border-premium shadow-xl scale-105 bg-gradient-to-b from-background to-premium/5" 
                        : "hover:shadow-lg transition-shadow"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-premium text-white">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pb-6">
                      <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          plan.popular ? "bg-gradient-premium" : "bg-secondary"
                        }`}>
                          <IconComponent className={`w-8 h-8 ${
                            plan.popular ? "text-white" : "text-premium"
                          }`} />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-premium">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? "bg-gradient-premium hover:opacity-90 text-white" 
                            : "variant-outline"
                        }`}
                        size="lg"
                        asChild
                      >
                        <Link to="/sign-up">
                          {plan.cta}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">What happens if I exceed my usage limits?</h3>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional credits as needed.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Product Photography?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Glo AI Studio to create stunning product images.
            </p>
            <Button size="lg" className="bg-gradient-premium hover:opacity-90 text-white" asChild>
              <Link to="/sign-up">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pricing;