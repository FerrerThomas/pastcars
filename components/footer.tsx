import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4 p-2 rounded inline-block">
              <Image
                src="/images/logopastcars2.png"
                alt="PASTCARS Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 mb-4">Tu concesionaria de confianza para encontrar el auto perfecto.</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/vehiculos" className="hover:text-primary transition-colors">
                  Vehículos
                </Link>
              </li>
              <li>
                <Link href="/vehiculos?tipo=nuevo" className="hover:text-primary transition-colors">
                  Autos 0KM
                </Link>
              </li>
              <li>
                <Link href="/vehiculos?tipo=usado" className="hover:text-primary transition-colors">
                  Autos Usados
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Venta de 0KM</li>
              <li>Venta de Usados</li>
              <li>Financiación</li>
              <li>Tomamos tu usado</li>
              <li>Garantía extendida</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Av. Perón 536, Lincoln, Provincia de Buenos Aires</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="https://wa.me/5492355511672" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +54 9 2355 51-1672
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:ventas@pastcars.com" className="hover:text-primary transition-colors">
                  ventas@pastcars.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PASTCARS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
