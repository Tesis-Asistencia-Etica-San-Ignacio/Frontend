import HeroSection from "@/components/organisms/Hero-section.tsx";
import FeaturesSection from "../organisms/Feature-section";
export default function LandingTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
