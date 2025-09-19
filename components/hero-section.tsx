import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Empowering Communities, <span className="text-primary">Changing Lives</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Join us in creating lasting impact through community-driven projects that address real needs and build
            sustainable futures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/donate">Make a Donation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">View Our Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
