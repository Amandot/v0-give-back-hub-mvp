import { HeroSection } from "@/components/hero-section"
import { ImpactStats } from "@/components/impact-stats"
import { FeaturedProjects } from "@/components/featured-projects"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ImpactStats />
      <FeaturedProjects />
    </main>
  )
}
