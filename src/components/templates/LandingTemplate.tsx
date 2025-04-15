import HeroSection from "@/components/organisms/Hero-section.tsx";
import FeaturesSection from "../organisms/Feature-section";
export default function LandingTemplate() {
  return (
    <section className="-mx-8 -my-6 ">
      <HeroSection />
      <FeaturesSection />
    </section>
  );
}
