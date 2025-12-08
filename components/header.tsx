"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Phone, Mail, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/vehiculos", label: "Vehículos" },
    { href: "/vehiculos?tipo=nuevo", label: "0KM" },
    { href: "/vehiculos?tipo=usado", label: "Usados" },
    { href: "/#contacto", label: "Contacto" },
  ]

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logopastcars.png" alt="PASTCARS Logo" width={200} height={50} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-end gap-8 mr-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="-mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b shadow-lg animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t flex flex-col gap-4 bg-muted/20 -mx-4 px-4 pb-4">
              <a
                href="https://wa.me/5492355511672"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+54 9 2355 51-1672</span>
              </a>
              <a
                href="mailto:ventas@pastcars.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>ventas@pastcars.com</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
