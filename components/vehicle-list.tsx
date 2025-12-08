import { createClient } from "@/lib/supabase/server"
import { VehicleCard } from "@/components/vehicle-card"

export async function VehicleList({
  searchParams,
}: {
  searchParams?: { tipo?: string; minPrice?: string; maxPrice?: string }
}) {
  const supabase = await createClient()

  let query = supabase.from("vehicles").select("*")

  // Apply filters
  if (searchParams?.tipo === "nuevo") {
    query = query.eq("is_new", true)
  } else if (searchParams?.tipo === "usado") {
    query = query.eq("is_new", false)
  }

  if (searchParams?.minPrice) {
    query = query.gte("price", Number.parseFloat(searchParams.minPrice))
  }

  if (searchParams?.maxPrice) {
    query = query.lte("price", Number.parseFloat(searchParams.maxPrice))
  }

  const { data: vehicles } = await query.order("created_at", { ascending: false })

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No se encontraron vehículos con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
