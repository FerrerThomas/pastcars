import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-white border-b h-16 flex items-center px-6 justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <span>Panel de Administración</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/">
                            Ver Sitio
                            <LogOut className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="p-6 md:p-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    )
}
