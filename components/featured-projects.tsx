import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedProjects() {
  const projects = [
    {
      title: "Clean Water Initiative",
      description:
        "Providing access to clean drinking water in rural communities through well construction and water purification systems.",
      impact: "500 families served",
      image: "/placeholder-fpzq0.png",
    },
    {
      title: "Education Support Program",
      description: "Building schools and providing educational resources to underserved children in remote areas.",
      impact: "300 children enrolled",
      image: "/diverse-children-learning.png",
    },
    {
      title: "Healthcare Access Project",
      description:
        "Mobile health clinics bringing essential medical care to communities lacking healthcare infrastructure.",
      impact: "1,200 patients treated",
      image: "/placeholder-pkd0v.png",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover how your support is creating lasting change in communities around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{project.impact}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/projects">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
