"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const searchParams = useSearchParams()
  const vehicleId = searchParams.get("vehiculo")

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      vehicle_id: vehicleId || null,
    }

    try {
      const supabase = createClient()
      const { error: submitError } = await supabase.from("contact_submissions").insert([data])

      if (submitError) throw submitError

      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el formulario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nombre Completo *</Label>
            <Input id="name" name="name" type="text" required placeholder="Juan Pérez" />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="juan@ejemplo.com" />
          </div>

          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+54 11 1234-5678" />
          </div>

          <div>
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" name="message" rows={5} placeholder="Escribe tu consulta aquí..." />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">
                ¡Gracias por tu consulta! Nos pondremos en contacto a la brevedad.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Consulta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
