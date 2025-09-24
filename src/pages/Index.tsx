import HeroSection from "@/components/HeroSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import BenefitsGrid from "@/components/BenefitsGrid";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <>
      {/* SEO meta tags */}
      <title>AI Product Photography | Studio-Quality Images Without the Studio</title>
      <meta name="description" content="Transform ordinary product photos into stunning marketing visuals with AI. Perfect for jewelry, apparel, and consumer brands. Start creating professional images today." />
      
      <main className="min-h-screen">
        <HeroSection />
        <BeforeAfterGallery />
        <BenefitsGrid />
        <HowItWorks />
        <FinalCTA />
      </main>
    </>
  );
};

export default Index;
