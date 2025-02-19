"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample property data with placeholder images
const properties = [
  {
    id: 1,
    address: "Church St main road, Chennai",
    price: 21990000,
    beds: 3,
    baths: 2,
    sqft: 2134,
    Sotheby: 25999999,
    monthlyPayment: 70000,
    images: [
      "./img/property/pro-1.0.png?height=500&width=600",
      "./img/property/pro-1.1.png?height=500&width=600",
      "./img/property/pro-1.2.png?height=500&width=600",
      "./img/property/pro-1.3.png?height=500&width=600",
      "./img/property/pro-1.4.png?height=500&width=600",
      "./img/property/pro-1.5.png?height=500&width=600",
    ],
  },
  {
    id: 2,
    address: "Gachibowli tech hub, Hyderabad",
    price: 29900000,
    beds: 2,
    baths: 3,
    sqft: 2500,
    Sotheby: 35000000,
    monthlyPayment: 120000,
    images: [
      "./img/property/pro-2.0.png?height=500&width=600",
      "./img/property/pro-2.1.png?height=500&width=600",
      "./img/property/pro-2.2.png?height=500&width=600",
      "./img/property/pro-2.3.png?height=500&width=600",
      "./img/property/pro-2.4.png?height=500&width=600",
      "./img/property/pro-2.5.png?height=500&width=600",
    ],
  },
  {
    id: 3,
    address: "Coorg Bevarly-park, Karnataka",
    price: 84900000,
    beds: 5,
    baths: 4,
    sqft: 2500,
    Sotheby: 100000000,
    monthlyPayment: 160000,
    images: [
      "./img/property/pro-3.0.png?height=500&width=600",
      "./img/property/pro-3.1.png?height=500&width=600",
      "./img/property/pro-3.2.png?height=500&width=600",
      "./img/property/pro-3.3.png?height=500&width=600",
      "./img/property/pro-3.4.png?height=500&width=600",
      "./img/property/pro-3.5.png?height=500&width=600",
    ],
  },
  // Add more properties as needed
]

const investmentOptions = {
  property: [
    { name: "Commercial Real Estate", img: "/commercial.png", link: "#" },
    { name: "Residential Property", img: "/residential.png", link: "#" },
    { name: "Land Investment", img: "/land.png", link: "#" },
  ],
  reit: [
    { name: "Public REITs", img: "/public.png", link: "#" },
    { name: "Private REITs", img: "/private.png", link: "#" },
    { name: "Hybrid REITs", img: "/hybrid.png", link: "#" },
  ],
};

interface InvestmentOption {
  name: string;
  img: string;
  link: string;
}

const formatINR = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export function PropertyInvestment() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [moreOptionsForm, setMoreOptionsForm] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handlePrevImage = () => {
    const currentProperty = properties[currentPropertyIndex]
    setCurrentImageIndex((prev) => (prev === 0 ? currentProperty.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    const currentProperty = properties[currentPropertyIndex]
    setCurrentImageIndex((prev) => (prev === currentProperty.images.length - 1 ? 0 : prev + 1))
  }

  const handlePrevProperty = () => {
    setCurrentPropertyIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1))
    setCurrentImageIndex(0)
  }

  const handleNextProperty = () => {
    setCurrentPropertyIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1))
    setCurrentImageIndex(0)
  }

  const handleContactAgent = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setShowContactForm(true)
  }

  const handleMoreOptions = () => {
    setMoreOptionsForm(true)
  }

  const currentProperty = properties[currentPropertyIndex]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">PROPERTY INVESTMENT OPTIONS</h1>

      <Card className="overflow-hidden">
        <div className="relative h-[500px] group">
          <div className="relative w-full h-full">
            <img
              src={currentProperty.images[currentImageIndex]}
              alt={currentProperty.address}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="bg-white/80 rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 rounded-full">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold">{formatINR(currentProperty.price)}</h2>
              <p className="text-lg text-muted-foreground">
                {currentProperty.beds} bd | {currentProperty.baths} ba | {currentProperty.sqft.toLocaleString()} sqft
              </p>
              <p className="text-muted-foreground">{currentProperty.address}</p>
              <p className="text-lg text-muted-foreground">Monthly Payment: {formatINR(currentProperty.monthlyPayment)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Sotheby</p>
              <p className="font-semibold">{formatINR(currentProperty.Sotheby)}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => handleContactAgent(currentProperty)}>
              Contact Agent
            </Button>
            <Button variant="outline" className="flex-1">
              Take a Tour
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevProperty}>Previous Property</Button>
        <Button onClick={() => handleMoreOptions()}>More Options</Button>
        <Button onClick={handleNextProperty}>Next Property</Button>
      </div>

      <Dialog open={moreOptionsForm} onOpenChange={setMoreOptionsForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
          <div className="grid gap-8 p-6">
      <Card className="shadow-lg border rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Investment Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {Object.entries(investmentOptions).map(([category, options]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {category === "property" ? "Direct Property Investment" : "REITs Investment"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {options.map((option) => (
                  <Card
                    key={option.name}
                    className="relative p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                    onClick={() => {
                      setSelectedOption(option);
                      setOpenDialog(true);
                    }}
                  >
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <img src={option.img} alt={option.name} className="w-16 h-16 mb-4" />
                      <p className="text-lg font-medium text-gray-700">{option.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg p-6">
          <DialogTitle className="text-xl font-bold text-gray-900 mb-4">
            {selectedOption?.name}
          </DialogTitle>
          <img src={selectedOption?.img} alt={selectedOption?.name} className="w-20 h-20 mx-auto mb-4" />
          <p className="text-gray-700 text-center">Explore investment opportunities in {selectedOption?.name}.</p>
          <div className="flex justify-center mt-4">
            <Button asChild variant="default" size="lg">
              <a href={selectedOption?.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>More about this property</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="I am interested in this property..."
                defaultValue={`I am interested in ${selectedProperty?.address}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="military" />
              <label htmlFor="military" className="text-sm">
                I have served in the U.S. Military.
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="preapproved" />
              <label htmlFor="preapproved" className="text-sm">
                Get pre-approved by a lender.
              </label>
            </div>
            <Button type="submit" className="w-full">
              Email Agent
            </Button>
            <p className="text-xs text-muted-foreground">
              By proceeding, you consent to receive calls and texts at the number provided, including marketing by
              autodialer and prerecorded and artificial voice, from realtor.com and others about your inquiry and other
              home-related matters.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}