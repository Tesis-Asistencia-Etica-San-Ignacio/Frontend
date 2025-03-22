import { AuroraText } from "../atoms/magicui/aurora-text";
import { Button } from "../atoms/ui/button";
import { BlurFade } from "../atoms/magicui/blur-fade";
export default function TextSection() {
    return (
      <div className="space-y-6">
        <BlurFade delay={0.25} inView>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Bienvenido a{" "}
            <AuroraText>
              Nuestra Plataforma
            </AuroraText>
          </h1>
        </BlurFade>
  
        <BlurFade delay={0.5} inView>
          <p className="text-lg text-gray-600">
            Unimos la innovación y la tecnología para brindarte las mejores soluciones.
          </p>
        </BlurFade>
  
        <BlurFade delay={0.75} inView>
          <Button variant="landing" size="lg">Empezar ahora</Button>
        </BlurFade>
      </div>
    );
  }