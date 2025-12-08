import { createClient } from "@/lib/supabase/server"
import { VehicleForm } from "@/components/admin/vehicle-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    // Fetch vehicle details
    const { data: vehicle, error } = await supabase
        .from("vehicles")
        .select("*, images:vehicle_images(*)")
        .eq("id", params.id)
        .single()

    if (error || !vehicle) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Editar Vehículo</h1>
                    <p className="text-muted-foreground">Modifica la información del vehículo.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6 md:p-8">
                <VehicleForm initialData={vehicle} isEditing />
            </div>
        </div>
    )
}
