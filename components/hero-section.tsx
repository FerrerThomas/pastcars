"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { useRef } from "react"

const heroImages = [
  "/images/plataformaHero/plataformaAmarok.png",
  "/images/plataformaHero/plataformaTera.png",
]

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const fadePlugin = useRef(Fade())

  return (
    <section className="relative bg-background overflow-hidden py-8 md:py-12 lg:py-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 opacity-20 transform translate-x-1/2 -translate-y-1/2">
        {/* Abstract curvy lines could be an SVG or just subtle gradients */}
        <div className="w-[800px] h-[800px] rounded-full border-[60px] border-muted/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="order-2 lg:order-1 lg:col-span-5 max-w-xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Donde encontrar <br />
                tu próximo vehículo <br />
                es más fácil.
              </h1>
              <p className="text-xl md:text-2xl font-medium text-primary">
                Compra en concesionarios oficiales.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-bold shadow-md">
                <Link href="/vehiculos">
                  Ver vehículos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-bold border-2">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative w-full max-w-2xl mx-auto lg:max-w-none animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
            <Carousel
              plugins={[plugin.current, fadePlugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {heroImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] w-full transform scale-[1.15]">
                      <Image
                        src={src}
                        alt={`Vehículo destacado ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

        </div>
      </div>
    </section>
  )
}
