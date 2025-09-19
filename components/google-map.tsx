"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Heart, Users } from "lucide-react"
import Link from "next/link"

interface NGO {
  id: number
  name: string
  description: string
  category: string
  location: string
  coordinates: { lat: number; lng: number }
  distance: string
  beneficiaries: string
  contact: {
    phone: string
    email: string
  }
  urgentNeeds: string[]
  image: string
}

interface GoogleMapProps {
  ngos: NGO[]
  selectedNGO: NGO | null
  onNGOSelect: (ngo: NGO) => void
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function GoogleMap({ ngos, selectedNGO, onNGOSelect }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = () => {
        setIsLoaded(true)
      }

      document.head.appendChild(script)
    } else {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      // Initialize map centered on Mumbai
      const mumbaiCenter = { lat: 19.076, lng: 72.8777 }

      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: mumbaiCenter,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#fef7f0" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#e8f4f8" }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{ color: "#f0f9ff" }],
          },
        ],
      })

      setMap(newMap)
    }
  }, [isLoaded, map])

  useEffect(() => {
    if (map && ngos.length > 0) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null))

      // Create new markers
      const newMarkers = ngos.map((ngo) => {
        const marker = new window.google.maps.Marker({
          position: ngo.coordinates,
          map: map,
          title: ngo.name,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#059669" stroke="#ffffff" strokeWidth="2"/>
                <path d="M16 8L16 24M8 16L24 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16),
          },
        })

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-semibold text-lg text-emerald-700 mb-2">${ngo.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${ngo.description}</p>
              <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">${ngo.category}</span>
                <span>${ngo.distance}</span>
              </div>
              <button 
                onclick="window.selectNGO(${ngo.id})" 
                class="w-full bg-emerald-600 text-white px-3 py-2 rounded text-sm hover:bg-emerald-700 transition-colors"
              >
                View Details & Donate
              </button>
            </div>
          `,
        })

        marker.addListener("click", () => {
          // Close all other info windows
          newMarkers.forEach((m) => m.infoWindow?.close())
          infoWindow.open(map, marker)
          onNGOSelect(ngo)
        })

        marker.infoWindow = infoWindow
        return marker
      })

      setMarkers(newMarkers)

      // Add global function to select NGO from info window
      window.selectNGO = (ngoId: number) => {
        const ngo = ngos.find((n) => n.id === ngoId)
        if (ngo) {
          onNGOSelect(ngo)
        }
      }
    }
  }, [map, ngos, onNGOSelect])

  // Highlight selected NGO marker
  useEffect(() => {
    if (selectedNGO && markers.length > 0) {
      markers.forEach((marker) => {
        const isSelected = marker.getTitle() === selectedNGO.name
        marker.setIcon({
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" fill="${isSelected ? "#dc2626" : "#059669"}" stroke="#ffffff" strokeWidth="3"/>
              <path d="M20 8L20 32M8 20L32 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(isSelected ? 40 : 32, isSelected ? 40 : 32),
          anchor: new window.google.maps.Point(isSelected ? 20 : 16, isSelected ? 20 : 16),
        })
      })
    }
  }, [selectedNGO, markers])

  if (!isLoaded) {
    return (
      <div className="h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">Loading Map...</h3>
            <p className="text-muted-foreground">Initializing Google Maps</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="font-medium">NGO Locations</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{ngos.length} NGOs in Mumbai</p>
      </div>

      {/* Selected NGO Quick Info */}
      {selectedNGO && (
        <Card className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm shadow-lg animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-primary">{selectedNGO.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {selectedNGO.location} • {selectedNGO.distance}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {selectedNGO.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {selectedNGO.beneficiaries}
                  </span>
                </div>
              </div>
              <Button asChild size="sm" className="ml-4">
                <Link href={`/donate?ngo=${selectedNGO.id}`}>
                  <Heart className="h-3 w-3 mr-1" />
                  Donate
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
