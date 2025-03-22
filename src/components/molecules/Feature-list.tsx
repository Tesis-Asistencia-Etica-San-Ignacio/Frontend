import { TextAnimate } from "../atoms/magicui/text-animate";
import { Card, CardContent } from "../atoms/ui/card";
import { Mail, Upload, BrainCircuit } from "lucide-react"; 

const features = [
  {
    icon: <Upload />,
    title: "Cargar Documentos",
    description: "Sube archivos y documentos de forma segura y rápida.",
  },
  {
    icon: <BrainCircuit />,
    title: "Evaluación Ética con IA",
    description: "Utiliza inteligencia artificial para evaluar casos éticos.",
  },
  {
    icon: <Mail />,
    title: "Automatización de Correos",
    description: "Envía correos automáticos a los participantes.",
  },
];

export default function FeatureList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 bg-[#101828] text-white shadow-md">
          <CardContent className="flex items-center gap-4">
            <div className="text-blue-400 text-3xl">{feature.icon}</div>
            <div>
            
              <TextAnimate animation="fadeIn" by="line" as="h3" className="text-xl font-semibold">
                {feature.title}
              </TextAnimate>

            
              <TextAnimate animation="fadeIn" by="line" as="p" className="text-gray-400">
                {feature.description}
              </TextAnimate>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
