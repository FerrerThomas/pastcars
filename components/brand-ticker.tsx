"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import { useRef } from "react"

// Map of filenames found in public/logosCars
const brandLogos = [
    { name: "Audi", src: "/logosCars/Audi-Logo-700x394.png" },
    { name: "BMW", src: "/logosCars/BMW-Logo-700x394.png" },
    { name: "Chevrolet", src: "/logosCars/Chevrolet_(9).png" },
    { name: "DS Automobiles", src: "/logosCars/DS-Automobiles-Logo-700x394.png" },
    { name: "Dodge", src: "/logosCars/Dodge_(4).png" },
    { name: "Fiat", src: "/logosCars/Fiat-Logo-700x394.png" },
    { name: "Ford", src: "/logosCars/Ford-Logo-500x281.png" },
    { name: "Honda", src: "/logosCars/Honda-Logo-700x394.png" },
    { name: "Mazda", src: "/logosCars/Mazda-Logo-700x394.png" },
    { name: "Mercedes Benz", src: "/logosCars/Mercedes-Benz-Logo-700x394.png" },
    { name: "Renault", src: "/logosCars/Renault-Logo-700x394.png" },
    { name: "Toyota", src: "/logosCars/Toyota-logo-500x281.png" },
    { name: "Volkswagen", src: "/logosCars/Volkswagen-logo.png" },
]

export function BrandTicker() {
    const plugin = useRef(
        AutoScroll({
            speed: 1, // continuous movement
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    )

    return (
        <section className="py-8 bg-muted/30 border-y">
            <div className="container mx-auto px-4 overflow-hidden">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                        dragFree: true,
                        containScroll: "trimSnaps",
                    }}
                >
                    <CarouselContent className="-ml-8"> {/* Negative margin to offset item padding */}
                        {brandLogos.map((brand, index) => (
                            <CarouselItem key={index} className="pl-8 basis-[25%] md:basis-[15%] lg:basis-[10%]">
                                <div className="relative h-12 w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center">
                                    <Image
                                        src={brand.src}
                                        alt={`${brand.name} logo`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
