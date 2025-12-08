import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedVehicles } from "@/components/featured-vehicles"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer"
import { BrandTicker } from "@/components/brand-ticker"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BrandTicker />
      <FeaturedVehicles />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
    </main>
  )
}
