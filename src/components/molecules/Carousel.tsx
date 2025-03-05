import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/atoms/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/atoms/ui/carousel";

const slides = [
    {
        imageUrl: "src/assets/anime-4k-pictures-s6fzu24pgsaxtsfb.jpg",
        title: "Bienvenido",
        description: "Al sistema de asistencia a la evaluación ética del HUSI",
    },
    {
        imageUrl: "src/assets/anime-4k-pictures-s6fzu24pgsaxtsfb.jpg",
        title: "Otra sección",
        description: "Información relevante para el usuario",
    },
    {
        imageUrl: "src/assets/anime-4k-pictures-s6fzu24pgsaxtsfb.jpg",
        title: "Último Slide",
        description: "Pequeña descripción final",
    },
];

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <div className="flex flex-col w-11/12  justify-center items-center mx-auto my-auto">
            <Carousel
                opts={{ loop: true }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 relative ">
                                <Card>
                                    <CardContent className="p-0 relative">
                                        <div className="aspect-square relative">
                                            <img
                                                src={slide.imageUrl}
                                                alt="Imagen del slide"
                                                className=" h-full w-full object-cover dark:brightness-[0.2] dark:grayscale  rounded-3xl"
                                            />
                                            <div className="absolute bottom-0 left-8   bg-opacity-50 p-2 rounded-tr-xl">
                                                <h3 className="text-white text-3xl font-bold">
                                                    {slide.title}
                                                </h3>
                                                <p className="text-white text-xl w-8/12">
                                                    {slide.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
