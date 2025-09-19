"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Clock, Truck, Package } from "lucide-react"

const ngoData = {
  1: {
    name: "Mumbai Education Foundation",
    location: "Dharavi, Mumbai",
    beneficiaries: "5,000+ children",
    urgentNeeds: ["Books", "Stationery", "Computers"],
    category: "Education",
  },
  2: {
    name: "Clean Water Mumbai",
    location: "Bandra East, Mumbai",
    beneficiaries: "15,000+ families",
    urgentNeeds: ["Water Filters", "Pipes", "Funding"],
    category: "Water & Sanitation",
  },
  3: {
    name: "Mumbai Health Care Initiative",
    location: "Powai, Mumbai",
    beneficiaries: "8,000+ patients",
    urgentNeeds: ["Medical Supplies", "Medicines", "Volunteers"],
    category: "Healthcare",
  },
  4: {
    name: "Women Empowerment Mumbai",
    location: "Andheri West, Mumbai",
    beneficiaries: "3,500+ women",
    urgentNeeds: ["Sewing Machines", "Training Materials", "Microfinance"],
    category: "Women Empowerment",
  },
}

interface DonationFormProps {
  selectedNGO?: string
}

export function DonationForm({ selectedNGO }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("one-time")
  const [donationCategory, setDonationCategory] = useState<string>("money")
  const [pickupPreference, setPickupPreference] = useState<string>("pickup")
  const [pickupDate, setPickupDate] = useState<string>("")
  const [pickupTime, setPickupTime] = useState<string>("")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ngoInfo = selectedNGO ? ngoData[selectedNGO as keyof typeof ngoData] : null

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const ngoMessage = ngoInfo ? ` to ${ngoInfo.name}` : ""
    alert(`Thank you for your ${donationCategory} donation${ngoMessage}! This is a demo - no payment was processed.`)
    setIsSubmitting(false)
  }

  const getSelectedAmountValue = () => {
    if (selectedAmount === "custom") {
      return Number.parseFloat(customAmount) || 0
    }
    return Number.parseFloat(selectedAmount) || 0
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {ngoInfo && (
        <Card className="bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">Donating to: {ngoInfo.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{ngoInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Serving {ngoInfo.beneficiaries}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {ngoInfo.category}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium">Urgent Needs:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ngoInfo.urgentNeeds.map((need) => (
                      <Badge key={need} variant="secondary" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donation Category Selection */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Label className="text-base font-medium">What would you like to donate?</Label>
        <RadioGroup value={donationCategory} onValueChange={setDonationCategory} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="money" id="money" />
            <Label htmlFor="money">Money (₹)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="items" id="items" />
            <Label htmlFor="items">Items (Clothes, Books, etc.)</Label>
          </div>
        </RadioGroup>
      </div>

      {donationCategory === "money" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          {/* Donation Type */}
          <div>
            <Label className="text-base font-medium">Donation Type</Label>
            <RadioGroup value={donationType} onValueChange={setDonationType} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-time donation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly donation</Label>
                <Badge variant="secondary" className="ml-2">
                  More Impact
                </Badge>
              </div>
            </RadioGroup>
          </div>

          {/* Amount Selection */}
          <div>
            <Label className="text-base font-medium">Donation Amount (₹)</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount.toString() ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount.toString())
                    setCustomAmount("")
                  }}
                  className="h-12 smooth-hover hover:scale-105"
                >
                  ₹{amount.toLocaleString("en-IN")}
                </Button>
              ))}
            </div>

            <div className="mt-3">
              <Button
                type="button"
                variant={selectedAmount === "custom" ? "default" : "outline"}
                onClick={() => setSelectedAmount("custom")}
                className="w-full h-12 smooth-hover hover:scale-105"
              >
                Custom Amount
              </Button>
            </div>

            {selectedAmount === "custom" && (
              <div className="mt-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Label htmlFor="custom-amount">Enter Amount (₹)</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items donation section */}
      {donationCategory === "items" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div>
            <Label className="text-base font-medium">What items are you donating?</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="clothes" />
                <Label htmlFor="clothes">Clothes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="books" />
                <Label htmlFor="books">Books</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="toys" />
                <Label htmlFor="toys">Toys</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="electronics" />
                <Label htmlFor="electronics">Electronics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="furniture" />
                <Label htmlFor="furniture">Furniture</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medical" />
                <Label htmlFor="medical">Medical Supplies</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="item-description">Item Description</Label>
            <Textarea
              id="item-description"
              placeholder="Please describe the items you're donating (condition, quantity, etc.)"
              className="mt-1"
              rows={4}
            />
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Pickup & Drop Services</Label>
              </div>

              <RadioGroup value={pickupPreference} onValueChange={setPickupPreference} className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="pickup" className="font-medium cursor-pointer">
                      Free Pickup Service
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll collect items from your doorstep. Available across Mumbai.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        Free for donations ₹500+
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        24-48 hours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="dropoff" id="dropoff" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="dropoff" className="font-medium cursor-pointer">
                      Drop-off at Center
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bring items to our collection centers. Open 9 AM - 6 PM daily.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />5 locations in Mumbai
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Immediate processing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="express" id="express" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="express" className="font-medium cursor-pointer">
                      Express Pickup
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Same-day pickup service for urgent donations.</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        ₹100 service fee
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Same day
                      </span>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {(pickupPreference === "pickup" || pickupPreference === "express") && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <Label className="font-medium">Schedule Pickup</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup-date">Preferred Date</Label>
                      <Input
                        id="pickup-date"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pickup-time">Preferred Time</Label>
                      <select
                        id="pickup-time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select time slot</option>
                        <option value="9-12">9:00 AM - 12:00 PM</option>
                        <option value="12-15">12:00 PM - 3:00 PM</option>
                        <option value="15-18">3:00 PM - 6:00 PM</option>
                        <option value="18-21">6:00 PM - 9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="special-instructions">Special Instructions</Label>
                    <Textarea
                      id="special-instructions"
                      placeholder="Any specific instructions for our pickup team (building access, contact person, etc.)"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {pickupPreference === "dropoff" && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <Label className="font-medium">Drop-off Centers</Label>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-background/50">
                      <div className="font-medium text-sm">Bandra Collection Center</div>
                      <div className="text-xs text-muted-foreground">Hill Road, Bandra West • Open 9 AM - 6 PM</div>
                    </div>
                    <div className="p-3 border rounded-lg bg-background/50">
                      <div className="font-medium text-sm">Andheri Hub</div>
                      <div className="text-xs text-muted-foreground">SV Road, Andheri West • Open 9 AM - 6 PM</div>
                    </div>
                    <div className="p-3 border rounded-lg bg-background/50">
                      <div className="font-medium text-sm">Powai Center</div>
                      <div className="text-xs text-muted-foreground">Hiranandani Gardens • Open 9 AM - 6 PM</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Donor Information */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
        <Label className="text-base font-medium">Donor Information</Label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name *</Label>
            <Input id="first-name" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name *</Label>
            <Input id="last-name" required className="mt-1" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input id="address" required className="mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input id="city" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="zip">PIN Code *</Label>
            <Input id="zip" required className="mt-1" />
          </div>
        </div>
      </div>

      {/* Project Selection - Modified for NGO context */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600">
        <Label htmlFor="project" className="text-base font-medium">
          {ngoInfo ? `Support ${ngoInfo.name}'s Programs` : "Designate Your Donation (Optional)"}
        </Label>
        <select id="project" className="w-full mt-2 p-2 border border-input rounded-md bg-background">
          <option value="">Where needed most</option>
          {ngoInfo ? (
            <>
              <option value="urgent-needs">Urgent Needs ({ngoInfo.urgentNeeds.join(", ")})</option>
              <option value="general-support">General Program Support</option>
              <option value="infrastructure">Infrastructure Development</option>
            </>
          ) : (
            <>
              <option value="clean-water">Clean Water Initiative</option>
              <option value="education">Education Support Program</option>
              <option value="healthcare">Healthcare Access Project</option>
              <option value="women-empowerment">Women's Empowerment Initiative</option>
              <option value="agriculture">Sustainable Agriculture Program</option>
              <option value="youth-skills">Youth Skills Development</option>
            </>
          )}
        </select>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder={
            ngoInfo ? `Share why you're supporting ${ngoInfo.name}...` : "Share why you're supporting our mission..."
          }
          className="mt-1"
          rows={3}
        />
      </div>

      {/* Summary */}
      {((donationCategory === "money" && getSelectedAmountValue() > 0) || donationCategory === "items") && (
        <Card className="bg-muted/30 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-900">
          <CardContent className="pt-4">
            {donationCategory === "money" ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{donationType === "monthly" ? "Monthly" : "One-time"} Donation:</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{getSelectedAmountValue().toLocaleString("en-IN")}
                  </span>
                </div>
                {donationType === "monthly" && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Annual impact: ₹{(getSelectedAmountValue() * 12).toLocaleString("en-IN")}
                  </p>
                )}
                {ngoInfo && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Supporting {ngoInfo.beneficiaries} through {ngoInfo.name}
                  </p>
                )}
              </>
            ) : (
              <div className="text-center">
                <span className="font-medium">Item Donation</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {ngoInfo
                    ? `Thank you for donating items to ${ngoInfo.name}!`
                    : "Thank you for donating items to support our mission!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full smooth-hover hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-1000"
        disabled={(donationCategory === "money" && !selectedAmount) || isSubmitting}
      >
        {isSubmitting
          ? "Processing..."
          : donationCategory === "money"
            ? `Donate ${getSelectedAmountValue() > 0 ? `₹${getSelectedAmountValue().toLocaleString("en-IN")}` : ""}`
            : pickupPreference === "pickup"
              ? "Schedule Pickup"
              : pickupPreference === "express"
                ? "Book Express Pickup"
                : "Submit for Drop-off"}
      </Button>

      <p className="text-xs text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-1100">
        {donationCategory === "money"
          ? "Your donation is secure and tax-deductible. You will receive a receipt via email."
          : pickupPreference === "pickup" || pickupPreference === "express"
            ? "We will contact you within 2 hours to confirm your pickup appointment."
            : "Visit any of our collection centers during operating hours. No appointment needed."}
      </p>
    </form>
  )
}
