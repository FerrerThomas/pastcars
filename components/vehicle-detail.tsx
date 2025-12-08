import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Gauge, Fuel, Cog, ArrowLeft } from "lucide-react"

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
}

export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(vehicle.price)

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
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-4">
            <Image
              src={vehicle.main_image || "/placeholder.svg?height=600&width=800&query=car"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
            />
            {vehicle.is_new && <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">0KM</Badge>}
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {vehicle.brand} {vehicle.model}
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
              <Link href={`/contacto?vehiculo=${vehicle.id}`}>Consultar por este Vehículo</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <a href="https://wa.me/541234567890" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
