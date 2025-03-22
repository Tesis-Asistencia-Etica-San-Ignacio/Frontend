import BlurGallery from "../molecules/Blur-gallery";
import TextSection from "../molecules/Text-section";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center min-h-screen  p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <TextSection />

        <div className="rounded-xl overflow-hidden ">
          <BlurGallery />
        </div>

      </div>
    </div>
  );
}
