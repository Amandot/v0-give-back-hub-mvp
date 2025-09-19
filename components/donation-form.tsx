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

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("one-time")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would submit to your payment processor
    alert("Thank you for your donation! This is a demo - no payment was processed.")
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
        <Label className="text-base font-medium">Donation Amount</Label>
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
              className="h-12"
            >
              ${amount}
            </Button>
          ))}
        </div>

        <div className="mt-3">
          <Button
            type="button"
            variant={selectedAmount === "custom" ? "default" : "outline"}
            onClick={() => setSelectedAmount("custom")}
            className="w-full h-12"
          >
            Custom Amount
          </Button>
        </div>

        {selectedAmount === "custom" && (
          <div className="mt-3">
            <Label htmlFor="custom-amount">Enter Amount ($)</Label>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="mt-1"
            />
          </div>
        )}
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" className="mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Project Selection */}
      <div>
        <Label htmlFor="project" className="text-base font-medium">
          Designate Your Donation (Optional)
        </Label>
        <select id="project" className="w-full mt-2 p-2 border border-input rounded-md bg-background">
          <option value="">Where needed most</option>
          <option value="clean-water">Clean Water Initiative</option>
          <option value="education">Education Support Program</option>
          <option value="healthcare">Healthcare Access Project</option>
          <option value="women-empowerment">Women's Empowerment Initiative</option>
          <option value="agriculture">Sustainable Agriculture Program</option>
          <option value="youth-skills">Youth Skills Development</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" placeholder="Share why you're supporting our mission..." className="mt-1" rows={3} />
      </div>

      {/* Preferences */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="updates" />
          <Label htmlFor="updates" className="text-sm">
            Send me updates about the projects I'm supporting
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="anonymous" />
          <Label htmlFor="anonymous" className="text-sm">
            Make this donation anonymous
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter" className="text-sm">
            Subscribe to our newsletter for impact stories and updates
          </Label>
        </div>
      </div>

      {/* Summary */}
      {getSelectedAmountValue() > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{donationType === "monthly" ? "Monthly" : "One-time"} Donation:</span>
              <span className="text-xl font-bold text-primary">${getSelectedAmountValue().toFixed(2)}</span>
            </div>
            {donationType === "monthly" && (
              <p className="text-sm text-muted-foreground mt-2">
                Annual impact: ${(getSelectedAmountValue() * 12).toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={!selectedAmount || isSubmitting}>
        {isSubmitting
          ? "Processing..."
          : `Donate ${getSelectedAmountValue() > 0 ? `$${getSelectedAmountValue().toFixed(2)}` : ""}`}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your donation is secure and tax-deductible. You will receive a receipt via email.
      </p>
    </form>
  )
}
