import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Gauge, Fuel } from "lucide-react"

interface Vehicle {
  id: string
  brand: string // keep for fallback/legacy types
  model: string // keep for fallback/legacy types
  year: number
  price: number
  kilometers: number | null
  fuel_type: string | null
  transmission: string | null
  is_new: boolean
  main_image: string | null
  color?: string
  brands?: { name: string }
  models?: { name: string }
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(vehicle.price)

  const brandName = vehicle.brands?.name || vehicle.brand
  const modelName = vehicle.models?.name || vehicle.model

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all py-0 gap-0">
      <div className="relative h-56 bg-muted">
        <Image
          src={vehicle.main_image || "/placeholder.svg?height=400&width=600&query=car"}
          alt={`${brandName} ${modelName}`}
          fill
          className="object-cover"
        />
        {vehicle.is_new && <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">0KM</Badge>}
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
          {brandName} {modelName}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{vehicle.year}</span>
          </div>
          {vehicle.kilometers !== null && (
            <div className="flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" />
              <span>{vehicle.kilometers?.toLocaleString("es-AR")} km</span>
            </div>
          )}
          {vehicle.fuel_type && (
            <div className="flex items-center gap-1">
              <Fuel className="h-3.5 w-3.5" />
              <span>{vehicle.fuel_type}</span>
            </div>
          )}
        </div>

        <p className="text-xl font-bold text-primary">{formattedPrice}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/vehiculos/${vehicle.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
