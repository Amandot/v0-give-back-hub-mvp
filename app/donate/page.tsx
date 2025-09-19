import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DonationForm } from "@/components/donation-form"
import { Heart, Users, Globe, Target } from "lucide-react"

export default function DonatePage() {
  const impactStats = [
    {
      icon: Users,
      value: "2,500+",
      label: "Lives Impacted",
      description: "People directly benefiting from our projects",
    },
    {
      icon: Globe,
      value: "12",
      label: "Countries",
      description: "Communities we're actively supporting",
    },
    {
      icon: Target,
      value: "18",
      label: "Active Projects",
      description: "Ongoing initiatives making a difference",
    },
    {
      icon: Heart,
      value: "95%",
      label: "Direct Impact",
      description: "Of donations go directly to projects",
    },
  ]

  const donationAmounts = [
    { amount: 25, impact: "Provides clean water for 1 family for a month" },
    { amount: 50, impact: "Supplies school materials for 5 children" },
    { amount: 100, impact: "Funds medical care for 10 patients" },
    { amount: 250, impact: "Supports a teacher's salary for a month" },
    { amount: 500, impact: "Builds a water well serving 50 families" },
    { amount: 1000, impact: "Constructs a classroom for 30 students" },
  ]

  return (
    <main className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Make a Lasting Impact</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Your donation directly supports sustainable development projects that create lasting change in communities
            around the world. Every contribution makes a meaningful difference.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="font-medium mb-2">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Make a Donation</CardTitle>
                <p className="text-muted-foreground">
                  Choose an amount or enter a custom donation. All donations are secure and tax-deductible.
                </p>
              </CardHeader>
              <CardContent>
                <DonationForm />
              </CardContent>
            </Card>
          </div>

          {/* Impact Examples */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
            <div className="space-y-4">
              {donationAmounts.map((donation, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="text-lg font-bold">
                          ${donation.amount}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{donation.impact}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <Card className="mt-8 bg-muted/30">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Why Donate with GiveBack Hub?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>95% of donations go directly to project implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Regular updates and photos from supported communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Transparent reporting on project outcomes and impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Tax-deductible receipts provided for all donations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Other Ways to Help */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Other Ways to Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Volunteer</h3>
                <p className="text-muted-foreground mb-4">
                  Join our team of volunteers and contribute your skills to make a direct impact.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Spread the Word</h3>
                <p className="text-muted-foreground mb-4">
                  Share our mission with friends and family to expand our reach and impact.
                </p>
                <Button variant="outline" size="sm">
                  Share Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Corporate Partnership</h3>
                <p className="text-muted-foreground mb-4">
                  Partner with us to create meaningful corporate social responsibility programs.
                </p>
                <Button variant="outline" size="sm">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
