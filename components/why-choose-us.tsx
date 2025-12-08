import { Shield, CreditCard, HeadphonesIcon, Award } from "lucide-react"

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Shield,
      title: "Garantía Certificada",
      description: "Todos nuestros vehículos cuentan con garantía oficial",
    },
    {
      icon: CreditCard,
      title: "Financiación Flexible",
      description: "Planes de financiación adaptados a tus necesidades",
    },
    {
      icon: HeadphonesIcon,
      title: "Atención Personalizada",
      description: "Equipo experto para asesorarte en tu compra",
    },
    {
      icon: Award,
      title: "Mejor Precio",
      description: "Los mejores precios del mercado garantizados",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Por Qué Elegir PASTCARS?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tu tranquilidad es nuestra prioridad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
