import {BlurFade} from "../atoms/magicui/blur-fade";

const imageUrls = [
    "src/assets/LogoHUSI.png",
    "src/assets/hospital-san-ignacio.png" ,
    "src/assets/evaluador.jpeg",
   "src/assets/doctores.png",
    "src/assets/HUSI.jpeg",
    "src/assets/ponti.jpg", 
    "src/assets/Sonriendo.jpg",
    "src/assets/husi2.jpg",
    "src/assets/Decoracion.jpg",
    "src/assets/bg-Medicina.jpg",
    
  ];
  
  export default function BlurGallery() {
    return (
      <section id="photos">
        <div className="columns-2 gap-4 sm:columns-3">
          {imageUrls.map((imageUrl, idx) => (
            <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
              <img
              className="mb-4 w-full h-auto rounded-lg object-contain"
              src={imageUrl}
              alt={`Imagen ${idx + 1}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
    );
  }