import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Suspense } from "react"

export function ContactSection() {
    return (
        <section id="contacto" className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Contactanos</h2>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    Estamos para ayudarte a encontrar tu próximo vehículo. Completá el formulario y nos pondremos en contacto a la
                    brevedad.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Suspense fallback={<div className="h-[600px] w-full bg-muted/10 animate-pulse rounded-xl" />}>
                            <ContactForm />
                        </Suspense>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">Información de Contacto</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                                        <p className="text-muted-foreground">
                                            Av. Principal 1234
                                            <br />
                                            Buenos Aires, Argentina
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Teléfono / WhatsApp</h4>
                                        <a href="https://wa.me/5492355511672" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                            +54 9 2355 51-1672
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Email</h4>
                                        <a
                                            href="mailto:ventas@pastcars.com"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            ventas@pastcars.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Horarios</h4>
                                        <p className="text-muted-foreground">
                                            Lunes a Viernes: 9:00 - 19:00
                                            <br />
                                            Sábados: 9:00 - 13:00
                                            <br />
                                            Domingos: Cerrado
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-xl overflow-hidden shadow-sm border border-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.62278818671535!2d-61.533991911411384!3d-34.85711653277224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c7434320c1e175%3A0xc54d27c2acc8c02e!2sAv.%20Per%C3%B3n%20536%2C%20Lincoln%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1765203827027!5m2!1ses!2sar"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-[450px]"
                    />
                </div>
            </div>
        </section>
    )
}
