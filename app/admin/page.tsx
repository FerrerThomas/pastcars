import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CarFront, FileText, Settings, Plus } from "lucide-react"

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    // Fetch stats
    const { count: totalVehicles } = await supabase.from("vehicles").select("*", { count: 'exact', head: true })
    const { count: newVehicles } = await supabase.from("vehicles").select("*", { count: 'exact', head: true }).eq('is_new', true)
    const { count: usedVehicles } = await supabase.from("vehicles").select("*", { count: 'exact', head: true }).eq('is_new', false)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
                <p className="text-muted-foreground mt-2">Bienvenido al centro de control de Past Cars.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Vehículos</CardTitle>
                        <CarFront className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalVehicles || 0}</div>
                        <p className="text-xs text-muted-foreground">En inventario</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usados</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usedVehicles || 0}</div>
                        <p className="text-xs text-muted-foreground">Vehículos usados en venta</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">0km</CardTitle>
                        <CarFront className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newVehicles || 0}</div>
                        <p className="text-xs text-muted-foreground">Unidades nuevas disponibles</p>
                    </CardContent>
                </Card>
            </div>

            {/* Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Link href="/admin/nuevo">
                    <div className="group relative flex h-40 flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:bg-accent hover:shadow-md cursor-pointer">
                        <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                            <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-lg">Añadir Vehículo</h3>
                            <p className="text-sm text-muted-foreground">Cargar un nuevo auto al inventario</p>
                        </div>
                    </div>
                </Link>

                <Link href="/admin/vehiculos">
                    <div className="group relative flex h-40 flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:bg-accent hover:shadow-md cursor-pointer">
                        <div className="rounded-full bg-green-100 p-4 group-hover:bg-green-200 transition-colors">
                            <Settings className="h-8 w-8 text-green-700" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-lg">Gestionar Vehículos</h3>
                            <p className="text-sm text-muted-foreground">Ver lista completa, editar o eliminar</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
