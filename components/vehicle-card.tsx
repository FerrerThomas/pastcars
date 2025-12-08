import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Gauge, Fuel } from "lucide-react"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  kilometers: number | null
  fuel_type: string | null
  transmission: string | null
  is_new: boolean
  main_image: string | null
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(vehicle.price)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted">
        <Image
          src={vehicle.main_image || "/placeholder.svg?height=400&width=600&query=car"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover"
        />
        {vehicle.is_new && <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">0KM</Badge>}
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {vehicle.brand} {vehicle.model}
        </h3>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          {vehicle.kilometers !== null && (
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span>{vehicle.kilometers.toLocaleString("es-AR")} km</span>
            </div>
          )}
          {vehicle.fuel_type && (
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              <span>{vehicle.fuel_type}</span>
            </div>
          )}
        </div>

        <p className="text-2xl font-bold text-primary mb-4">{formattedPrice}</p>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/vehiculos/${vehicle.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
