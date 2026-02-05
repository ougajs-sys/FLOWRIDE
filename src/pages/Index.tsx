import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import QualityPillars from "@/components/home/QualityPillars";
import OffersPreview from "@/components/home/OffersPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QualityPillars />
      <OffersPreview />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
