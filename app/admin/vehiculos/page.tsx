import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, CarFront, ArrowLeft } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DeleteVehicleButton } from "@/components/admin/delete-vehicle-button"

export default async function AdminVehiclesPage() {
    const supabase = await createClient()

    // Fetch vehicles with joined brands and models
    const { data: vehicles } = await supabase
        .from("vehicles")
        .select("*, brands(name), models(name)")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Listado de Vehículos</h1>
                        <p className="text-muted-foreground">Gestiona el inventario completo.</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/admin/nuevo">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Vehículo
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Imagen</TableHead>
                            <TableHead>Marca y Modelo</TableHead>
                            <TableHead>Año</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No hay vehículos cargados.
                                </TableCell>
                            </TableRow>
                        )}
                        {vehicles?.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                                <TableCell>
                                    <div className="relative h-12 w-20 rounded-md overflow-hidden bg-muted">
                                        {vehicle.main_image ? (
                                            <Image
                                                src={vehicle.main_image}
                                                alt={`${vehicle.brands?.name} ${vehicle.models?.name}`}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full w-full">
                                                <CarFront className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {vehicle.brands?.name} {vehicle.models?.name}
                                </TableCell>
                                <TableCell>{vehicle.year}</TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(vehicle.price)}
                                </TableCell>
                                <TableCell>
                                    {vehicle.is_new ? (
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">0km</Badge>
                                    ) : (
                                        <Badge variant="secondary">Usado</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/editar/${vehicle.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <DeleteVehicleButton
                                            vehicleId={vehicle.id}
                                            vehicleName={`${vehicle.brands?.name} ${vehicle.models?.name}`}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
