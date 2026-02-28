import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatSection from "@/components/WhatSection";
import BenefitsSection from "@/components/BenefitsSection";
import CodeSection from "@/components/CodeSection";
import DocsSection from "@/components/DocsSection";
import DemoSection from "@/components/DemoSection";
import FaqSection from "@/components/FaqSection";
import CtaFooter from "@/components/CtaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatSection />
      <BenefitsSection />
      <CodeSection />
      <DocsSection />
      <DemoSection />
      <FaqSection />
      <CtaFooter />
    </div>
  );
};

export default Index;
