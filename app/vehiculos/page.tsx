import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VehicleFilters } from "@/components/vehicle-filters"
import { VehicleList } from "@/components/vehicle-list"

export default function VehiculosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Nuestros Vehículos</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <VehicleFilters />
          </aside>
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Cargando vehículos...</div>}>
              <VehicleList />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
