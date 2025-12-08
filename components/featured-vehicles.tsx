import { createClient } from "@/lib/supabase/server"
import { VehicleCard } from "@/components/vehicle-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export async function FeaturedVehicles() {
  const supabase = await createClient()

  /* Fetch Used Vehicles */
  const { data: usedVehicles } = await supabase
    .from("vehicles")
    .select("*, brands(name), models(name)")
    .eq("is_new", false)
    .limit(3)
    .order("created_at", { ascending: false })

  /* Fetch New Vehicles */
  const { data: newVehicles } = await supabase
    .from("vehicles")
    .select("*, brands(name), models(name)")
    .eq("is_new", true)
    .limit(3)
    .order("created_at", { ascending: false })

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 space-y-20">

        {/* Usados Section */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Usados Seleccionados</h2>
              <p className="text-lg text-muted-foreground">
                Oportunidades únicas en seminuevos
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/vehiculos?tipo=usado">
                Ver más usados
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usedVehicles?.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Button asChild variant="outline" className="w-full">
              <Link href="/vehiculos?tipo=usado">
                Ver más usados
              </Link>
            </Button>
          </div>
        </div>

        {/* 0km Section */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">0km Destacados</h2>
              <p className="text-lg text-muted-foreground">
                Estrena tu próximo auto hoy
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/vehiculos?tipo=nuevo">
                Ver más 0km
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newVehicles?.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Button asChild variant="outline" className="w-full">
              <Link href="/vehiculos?tipo=nuevo">
                Ver más 0km
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
