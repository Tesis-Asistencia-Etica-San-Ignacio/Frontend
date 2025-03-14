import { TextAnimate } from "../atoms/magicui/text-animate";
import FeatureList from "../molecules/Feature-list";

export default function FeaturesSection() {
    return (
      <section className="bg-gray-900 text-white py-12 px-6 rounded-xl shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
         
          <TextAnimate animation="fadeIn" by="line" as="h2" className="text-4xl font-bold text-blue-400">
            Funcionalidades
          </TextAnimate>
  
          <TextAnimate animation="fadeIn" by="line" as="p" className="text-lg text-gray-400 mt-2">
            Descubre lo que nuestra plataforma puede hacer por ti.
          </TextAnimate>
        </div>
  
  
        <div className="mt-8">
          <FeatureList />
        </div>
      </section>
    );
  }