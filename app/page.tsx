import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import TestimonialStrip from "@/app/components/TestimonialStrip";
import RepeatedEmailCapture from "@/app/components/RepeatedEmailCapture";
import LegalFooter from "@/app/components/LegalFooter";

export default function Page() {
  return (
    <main className="pawwalk-page">
      <HeroSection />
      <FeaturesSection />
      <TestimonialStrip />
      <RepeatedEmailCapture />
      <LegalFooter />
    </main>
  );
}
