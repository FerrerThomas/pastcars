import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VehicleDetail } from "@/components/vehicle-detail"

export default async function VehiculoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", id).single()

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VehicleDetail vehicle={vehicle} />
      <Footer />
    </main>
  )
}
