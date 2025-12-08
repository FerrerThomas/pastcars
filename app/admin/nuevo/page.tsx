import { VehicleForm } from "@/components/admin/vehicle-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewVehiclePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Nuevo Vehículo</h1>
                    <p className="text-muted-foreground">Ingresa los detalles del vehículo para publicarlo.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6 md:p-8">
                <VehicleForm />
            </div>
        </div>
    )
}
