import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logopastcars.png" alt="PASTCARS Logo" width={200} height={50} className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-end gap-8 mr-6">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/vehiculos" className="text-foreground hover:text-primary font-medium transition-colors">
              Vehículos
            </Link>
            <Link
              href="/vehiculos?tipo=nuevo"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              0KM
            </Link>
            <Link
              href="/vehiculos?tipo=usado"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Usados
            </Link>
            <Link href="/#contacto" className="text-foreground hover:text-primary font-medium transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+541234567890"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              title="+54 123 456-7890"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="mailto:ventas@pastcars.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              title="ventas@pastcars.com"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
