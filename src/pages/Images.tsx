import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Wand2, Download, Lock } from "lucide-react";

const Images = () => {
  return (
    <>
      {/* SEO meta tags */}
      <title>Images - JewelStudio | Quick AI Image Generation</title>
      <meta name="description" content="Quick solo image creation. Upload product photos and instantly transform them with AI-powered backgrounds and effects." />
      
      <Header />
      <main className="min-h-screen pt-16">
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Quick Image Creation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Transform your product photos instantly with AI-powered backgrounds and effects
              </p>
              
              {/* Login Status Banner */}
              <div className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Login required to upload and generate images</span>
              </div>
            </div>

            {/* Quick Process Overview */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Upload className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Upload Products</CardTitle>
                  <CardDescription>
                    Upload your jewelry photos with clean backgrounds
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Wand2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">AI Transform</CardTitle>
                  <CardDescription>
                    AI instantly creates stunning backgrounds and scenes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                    <Download className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Download Results</CardTitle>
                  <CardDescription>
                    Get high-resolution images ready for marketing
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Upload Area Placeholder */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card/30 border-dashed border-2 border-muted-foreground/30">
                <CardContent className="py-16 text-center">
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready to Transform Your Images?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Login to start uploading your jewelry photos and creating stunning visuals
                  </p>
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                    Login to Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Images;