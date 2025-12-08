"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Gauge, Fuel, Cog, ArrowLeft } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface VehicleImage {
  id: string
  image_url: string
  display_order: number
}

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  kilometers: number | null
  fuel_type: string | null
  transmission: string | null
  description: string | null
  is_new: boolean
  main_image: string | null
  images?: VehicleImage[]
  color?: string
  brands?: { name: string }
  models?: { name: string }
}

export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(vehicle.price)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Combined images strategy: 
  // If we have gallery images, use them. 
  // If not, fall back to main_image wrapped in an object structure for the carousel.
  // We filter out duplicates if main_image is also in the images list (which is common).

  let userImages = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : vehicle.main_image
      ? [{ id: 'main', image_url: vehicle.main_image, display_order: 0 }]
      : []

  // Sort by display_order if needed, usually DB returning order is enough or we rely on default sort
  // For now we assume they come in a reasonable order or we trust the array order.

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/vehiculos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Vehículos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Image Gallery */}
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {userImages.length > 0 ? (
                userImages.map((img) => (
                  <CarouselItem key={img.id}>
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={img.image_url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        className="object-cover"
                        priority
                      />
                      {vehicle.is_new && <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">0KM</Badge>}
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center text-muted-foreground">
                    No hay imágenes disponibles
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {userImages.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>

          {/* Thumbnails */}
          {userImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {userImages.map((img, index) => (
                <button
                  key={img.id}
                  className={cn(
                    "relative w-20 h-14 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer",
                    current === index ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  onClick={() => api?.scrollTo(index)}
                >
                  <Image
                    src={img.image_url}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {vehicle.brands?.name || vehicle.brand} {vehicle.models?.name || vehicle.model}
          </h1>

          <p className="text-3xl font-bold text-primary mb-6">{formattedPrice}</p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Año</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>

                {vehicle.kilometers !== null && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kilómetros</p>
                      <p className="font-semibold">{vehicle.kilometers.toLocaleString("es-AR")} km</p>
                    </div>
                  </div>
                )}

                {vehicle.fuel_type && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Fuel className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Combustible</p>
                      <p className="font-semibold">{vehicle.fuel_type}</p>
                    </div>
                  </div>
                )}

                {vehicle.transmission && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Cog className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transmisión</p>
                      <p className="font-semibold">{vehicle.transmission}</p>
                    </div>
                  </div>
                )}

                {vehicle.color && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Cog className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Color</p>
                      <p className="font-semibold">{vehicle.color}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {vehicle.description && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-3">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <a
                href={`https://wa.me/5492355511672?text=${encodeURIComponent(`Hola! Estoy viendo el vehículo ${vehicle.brands?.name || vehicle.brand} ${vehicle.models?.name || vehicle.model} (${vehicle.year}) en la web y quisiera más información.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por este Vehículo
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <a href="https://wa.me/5492355511672" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
