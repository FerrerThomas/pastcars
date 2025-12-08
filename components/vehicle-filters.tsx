"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

export function VehicleFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tipo, setTipo] = useState(searchParams.get("tipo") || "todos")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (tipo !== "todos") params.set("tipo", tipo)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)

    router.push(`/vehiculos${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleReset = () => {
    setTipo("todos")
    setMinPrice("")
    setMaxPrice("")
    router.push("/vehiculos")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block font-semibold">Tipo de Vehículo</Label>
          <RadioGroup value={tipo} onValueChange={setTipo}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="todos" id="todos" />
              <Label htmlFor="todos" className="font-normal cursor-pointer">
                Todos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nuevo" id="nuevo" />
              <Label htmlFor="nuevo" className="font-normal cursor-pointer">
                0KM
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="usado" id="usado" />
              <Label htmlFor="usado" className="font-normal cursor-pointer">
                Usados
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block font-semibold">Rango de Precio</Label>
          <div className="space-y-3">
            <div>
              <Label htmlFor="minPrice" className="text-sm text-muted-foreground">
                Precio Mínimo
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="$ 0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-sm text-muted-foreground">
                Precio Máximo
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="$ 100,000,000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleFilter} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Aplicar Filtros
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
