"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, Loader2, Star } from "lucide-react"

interface VehicleFormProps {
    initialData?: any
    isEditing?: boolean
}

export function VehicleForm({ initialData, isEditing = false }: VehicleFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Data State
    const [brands, setBrands] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])
    const [filteredModels, setFilteredModels] = useState<any[]>([])

    // Form State
    const [formData, setFormData] = useState({
        brand_id: initialData?.brand_id || "",
        model_id: initialData?.model_id || "",
        color: initialData?.color || "",
        year: initialData?.year || new Date().getFullYear(),
        price: initialData?.price || "",
        kilometers: initialData?.kilometers || 0,
        fuel_type: initialData?.fuel_type || "Nafta",
        transmission: initialData?.transmission || "Manual",
        description: initialData?.description || "",
        is_new: initialData?.is_new || false,
    })

    // Fetch Lists
    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const { data: brandsData } = await supabase.from('brands').select('*').order('name')
            const { data: modelsData } = await supabase.from('models').select('*').order('name')

            if (brandsData) setBrands(brandsData)
            if (modelsData) {
                setModels(modelsData)
                // If initial brand is set, filter models immediately
                if (initialData?.brand_id) {
                    setFilteredModels(modelsData.filter((m: any) => m.brand_id === initialData.brand_id))
                }
            }
        }
        fetchData()
    }, [initialData])

    // Handle Brand Change
    const handleBrandChange = (brandId: string) => {
        setFormData(prev => ({ ...prev, brand_id: brandId, model_id: "" })) // Reset model
        const validModels = models.filter(m => m.brand_id === brandId)
        setFilteredModels(validModels)
    }

    // Images State
    const [images, setImages] = useState<string[]>(initialData?.images?.map((img: any) => img.image_url) || [])
    const [newImages, setNewImages] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [mainImage, setMainImage] = useState<string>(initialData?.main_image || "")

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files)

            if (images.length + newImages.length + files.length > 10) {
                alert("Máximo 10 imágenes permitidas por vehículo.")
                return
            }

            setNewImages((prev) => [...prev, ...files])

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file))
            setPreviewUrls((prev) => [...prev, ...newPreviews])
        }
    }

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index))
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const removeExistingImage = async (url: string) => {
        // Logic to remove from DB could go here, for now just UI
        setImages(prev => prev.filter(img => img !== url))
    }

    const uploadImages = async (vehicleId: string) => {
        const supabase = createClient()
        const uploadedUrls: string[] = []

        for (const file of newImages) {
            const fileExt = file.name.split('.').pop()
            const fileName = `${vehicleId}/${Math.random()}.${fileExt}`
            const { error: uploadError } = await supabase.storage
                .from('vehicles')
                .upload(fileName, file)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                continue
            }

            const { data: { publicUrl } } = supabase.storage
                .from('vehicles')
                .getPublicUrl(fileName)

            uploadedUrls.push(publicUrl)
        }
        return uploadedUrls
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const supabase = createClient()

            // 1. Insert/Update Vehicle
            // 1. Insert/Update Vehicle
            const vehicleData = {
                brand_id: formData.brand_id, // Use ID
                model_id: formData.model_id, // Use ID
                color: formData.color,
                year: parseInt(formData.year.toString()),
                price: parseFloat(formData.price.toString()),
                kilometers: parseInt(formData.kilometers.toString()),
                fuel_type: formData.fuel_type,
                transmission: formData.transmission,
                description: formData.description,
                is_new: formData.is_new,
                main_image: mainImage.startsWith('blob:') ? null : mainImage
            }

            let vehicleId = initialData?.id

            if (isEditing) {
                const { error } = await supabase
                    .from('vehicles')
                    .update(vehicleData)
                    .eq('id', vehicleId)
                if (error) throw error
            } else {
                const { data, error } = await supabase
                    .from('vehicles')
                    .insert([vehicleData])
                    .select()
                    .single()

                if (error) throw error
                vehicleId = data.id
            }

            // 2. Upload Images
            // 2. Upload Images
            let resolvedMainImage = mainImage.startsWith('blob:') ? null : mainImage

            if (newImages.length > 0) {
                setUploading(true)
                const uploadedUrls = await uploadImages(vehicleId)

                // Insert into vehicle_images
                const imageRecords = uploadedUrls.map(url => ({
                    vehicle_id: vehicleId,
                    image_url: url
                }))

                const { error: imagesError } = await supabase
                    .from('vehicle_images')
                    .insert(imageRecords)

                if (imagesError) throw imagesError

                // Resolve main_image if it was a blob
                if (mainImage.startsWith('blob:')) {
                    const index = previewUrls.indexOf(mainImage)
                    if (index !== -1 && uploadedUrls[index]) {
                        resolvedMainImage = uploadedUrls[index]
                    }
                } else if (!resolvedMainImage && uploadedUrls.length > 0) {
                    // Fallback to first new image if no main selected
                    resolvedMainImage = uploadedUrls[0]
                }
            } else {
                if (!resolvedMainImage && images.length > 0) resolvedMainImage = images[0]
            }

            // Final Update for main_image if it changed
            if (resolvedMainImage && resolvedMainImage !== initialData?.main_image) {
                await supabase
                    .from('vehicles')
                    .update({ main_image: resolvedMainImage })
                    .eq('id', vehicleId)
            }

            router.push('/admin/vehiculos')
            router.refresh()

        } catch (error) {
            console.error('Error saving vehicle:', error)
            alert('Error al guardar el vehículo')
        } finally {
            setIsLoading(false)
            setUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium">Información Básica</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="brand">Marca</Label>
                            <Select
                                value={formData.brand_id}
                                onValueChange={handleBrandChange}
                                disabled={brands.length === 0}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar Marca" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="model">Modelo</Label>
                            <Select
                                value={formData.model_id}
                                onValueChange={(v) => setFormData(prev => ({ ...prev, model_id: v }))}
                                disabled={!formData.brand_id || filteredModels.length === 0}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar Modelo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredModels.map((model) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            {model.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="year">Año</Label>
                            <Input
                                id="year" type="number"
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Precio (ARS)</Label>
                            <Input
                                id="price" type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                            id="color"
                            value={formData.color}
                            onChange={e => setFormData({ ...formData, color: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Condición</Label>
                        <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <Switch
                                checked={formData.is_new}
                                onCheckedChange={checked => setFormData({ ...formData, is_new: checked })}
                            />
                            <Label>{formData.is_new ? 'Es 0km (Nuevo)' : 'Es Usado'}</Label>
                        </div>
                    </div>

                    {!formData.is_new && (
                        <div className="space-y-2">
                            <Label htmlFor="kilometers">Kilómetros</Label>
                            <Input
                                id="kilometers" type="number"
                                value={formData.kilometers}
                                onChange={e => setFormData({ ...formData, kilometers: parseInt(e.target.value) })}
                            />
                        </div>
                    )}
                </div>

                {/* Technical Details */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium">Detalles Técnicos</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fuel">Combustible</Label>
                            <Select value={formData.fuel_type} onValueChange={v => setFormData({ ...formData, fuel_type: v })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Nafta">Nafta</SelectItem>
                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                    <SelectItem value="GNC">GNC</SelectItem>
                                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                                    <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="transmission">Transmisión</Label>
                            <Select value={formData.transmission} onValueChange={v => setFormData({ ...formData, transmission: v })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Manual">Manual</SelectItem>
                                    <SelectItem value="Automática">Automática</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            rows={5}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Imágenes del Vehículo</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Existing Images */}
                    {images.map((url, index) => (
                        <div key={index} className={`relative aspect-video rounded-lg overflow-hidden border bg-muted group ${mainImage === url ? 'ring-2 ring-primary' : ''}`}>
                            <Image src={url} alt="Vehicle" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => setMainImage(url)}
                                className={`absolute top-1 left-1 p-1 rounded-full transition-all ${mainImage === url ? 'bg-primary text-white opacity-100' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'}`}
                                title="Usar como portada"
                            >
                                <Star className={`h-4 w-4 ${mainImage === url ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeExistingImage(url)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}

                    {/* New Previews */}
                    {previewUrls.map((url, index) => (
                        <div key={`new-${index}`} className={`relative aspect-video rounded-lg overflow-hidden border bg-muted group ${mainImage === url ? 'ring-2 ring-primary' : ''}`}>
                            <Image src={url} alt="New Upload" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => setMainImage(url)}
                                className={`absolute top-1 left-1 p-1 rounded-full transition-all ${mainImage === url ? 'bg-primary text-white opacity-100' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'}`}
                                title="Usar como portada"
                            >
                                <Star className={`h-4 w-4 ${mainImage === url ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeNewImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                Nuevo
                            </div>
                        </div>
                    ))}

                    {/* Upload Button */}
                    <div className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileSelect}
                        />
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Agregar Fotos</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || uploading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {uploading ? 'Subiendo imágenes...' : 'Guardando...'}
                        </>
                    ) : (
                        isEditing ? 'Actualizar Vehículo' : 'Crear Vehículo'
                    )}
                </Button>
            </div>
        </form>
    )
}
