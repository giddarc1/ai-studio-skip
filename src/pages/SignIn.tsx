import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Camera, Wand2, User, Sparkles } from "lucide-react";
import Header from "@/components/Header";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      // Force a page refresh to ensure auth state updates properly
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes('not configured')) {
          toast({
            title: "Google Sign-In Not Available",
            description: "Google OAuth needs to be configured in your Supabase project settings.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "Failed to sign in with Google. Please try email/password instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* SEO meta tags */}
      <title>Sign In | Glo AI Studio - Professional AI Product Photography</title>
      <meta name="description" content="Sign in to your Glo AI Studio account to access professional AI-powered product photography tools and transform your product images." />
      
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Marketing Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  ✨ Transform Your Product Photos with AI
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Create Studio-Quality 
                  <span className="bg-gradient-premium bg-clip-text text-transparent block">
                    Product Photography
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of creators using AI to generate professional product images in minutes, not hours.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">6 AI Tools</h3>
                    <p className="text-xs text-muted-foreground">Background removal, model integration, campaign shots</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Instant Results</h3>
                    <p className="text-xs text-muted-foreground">Generate professional images in under 60 seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Solo Friendly</h3>
                    <p className="text-xs text-muted-foreground">Perfect for individual creators and small teams</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Powered</h3>
                    <p className="text-xs text-muted-foreground">Advanced algorithms for realistic results</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-xs text-muted-foreground">Images Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">Active Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">6</div>
                  <div className="text-xs text-muted-foreground">AI Tools</div>
                </div>
              </div>
            </div>

            {/* Sign In Form Section */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card className="border-border/50 shadow-elegant bg-card/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to continue creating amazing product photography
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="transition-all duration-200 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link 
                          to="/reset-password" 
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pr-10 transition-all duration-200 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-premium hover:opacity-90 text-white shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleGoogleSignIn}
                    className="w-full border-border/50 hover:bg-muted/50"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link 
                        to="/sign-up" 
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Start creating for free →
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Call-to-Action for New Users */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-subtle border border-primary/20 text-center">
                <h3 className="font-semibold text-foreground mb-2">New to Glo AI Studio?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Join thousands of creators transforming their product photography with AI
                </p>
                <Button asChild className="w-full bg-gradient-premium hover:opacity-90 text-white">
                  <Link to="/sign-up">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Free Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;