"use client"

import PriceTrendChart from "./price-chart"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Car } from "lucide-react"
import { cn } from "@/lib/utils"
const goldOptions = [
  { name: "SBI Gold Direct Plan Growth", img: "./img/investment/sbi.png" },
  { name: "Zerodha Gold ETF", img: "./img/investment/zerodha.png" },
  { name: "SBI Gold Bees ETF", img: "./img/investment/sbi.png" },
];

const silverOptions = [
  { name: "Nippon India Silver ETF", img: "./img/investment/nippon.png" },
  { name: "Tata Silver ETF", img: "./img/investment/tata.png" },
  { name: "ICICI Prudential Silver ETF", img: "./img/investment/icici.png" },
];

const bondsOptions = [
  { name: "Sovereign Gold Bonds", img: "./img/investment/sgb.png" },
  { name: "Gold & Silver Bonds", img: "./img/investment/grow.png" },
];

interface GoldPriceData {
  items: {
    curr: string
    xauPrice: number
    xagPrice: number
    chgXau: number
    chgXag: number
    pcXau: number
    pcXag: number
    xauClose: number
    xagClose: number
  }[]
}

const weights = [
  { value: "1g", label: "1 gram" },
  { value: "10g", label: "10 grams" },
  { value: "1kg", label: "1 kilogram" },
]

// Convert troy ounce to grams (1 troy oz = 31.1034768 grams)
const troyOzToGram = 31.1034768

export function PreciousMetalsDashboard() {
  const [selectedMetal, setSelectedMetal] = useState("gold")
  const [selectedWeight, setSelectedWeight] = useState("1g")
  const [priceData, setPriceData] = useState<GoldPriceData | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [hoveredCard, setHoveredCard] = useState<{type: string; index: number} | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://data-asg.goldprice.org/dbXRates/INR")
        const data = await response.json()
        setPriceData(data)

        // Create sample chart data using current price as reference
        const baseGoldPrice = data.items[0].xauPrice
        const baseSilverPrice = data.items[0].xagPrice
        const newChartData = Array.from({ length: 6 }, (_, i) => ({
          name: new Date(Date.now() - (5 - i) * 86400000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          gold: baseGoldPrice * (1 + (Math.random() * 0.1 - 0.05)),
          silver: baseSilverPrice * (1 + (Math.random() * 0.1 - 0.05)),
        }))
        setChartData(newChartData)
      } catch (error) {
        console.error("Error fetching price data:", error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 300) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const calculatePrice = (metal: string, weight: string): number => {
    if (!priceData || !priceData.items || priceData.items.length === 0) return 0

    const pricePerOz = metal === "gold" ? priceData.items[0].xauPrice : priceData.items[0].xagPrice

    const pricePerGram = pricePerOz / troyOzToGram

    switch (weight) {
      case "1g":
        return pricePerGram
      case "10g":
        return pricePerGram * 10
      case "1kg":
        return pricePerGram * 1000
      default:
        return 0
    }
  }

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">PRECIOUS METAL PRICING</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Prices Section */}
        <Card>
          <CardHeader>
            <CardTitle>CURRENT PRICES</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-600">GOLD</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">1 gram</p>
                    <p className="text-lg font-bold">{formatINR(calculatePrice("gold", "1g"))}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">10 grams</p>
                    <p className="text-lg font-bold">{formatINR(calculatePrice("gold", "10g"))}</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold text-gray-400">SILVER</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">1 gram</p>
                    <p className="text-lg font-bold">{formatINR(calculatePrice("silver", "1g"))}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">1 kilogram</p>
                    <p className="text-lg font-bold">{formatINR(calculatePrice("silver", "1kg"))}</p>
                  </CardContent>
                </Card>
              </div>
              <PriceTrendChart />
            </div>
          </CardContent>
        </Card>
        {/* Buying Options Section */}
        <Card>
          <CardHeader>
            <CardTitle>BUYING OPTION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Metal</label>
                  <Select value={selectedMetal} onValueChange={setSelectedMetal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select metal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Weight</label>
                  <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {weights.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value}>
                          {weight.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Current Price</p>
                      <p className="text-2xl font-bold">{formatINR(calculatePrice(selectedMetal, selectedWeight))}</p>
                    </div>
                    <Button className="bg-yellow-600 hover:bg-yellow-700">Buy Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">24h Change</p>
                  <p
                    className={`text-lg font-bold ${
                      priceData?.items?.[0]?.pcXau !== undefined && priceData.items[0].pcXau > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {priceData?.items?.[0] ? `${priceData.items[0].pcXau.toFixed(2)}%` : "0%"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">7d Change</p>
                  <p
                    className={`text-lg font-bold ${
                      priceData?.items?.[0]?.pcXag !== undefined && priceData.items[0].pcXag > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {priceData?.items?.[0] ? `${priceData.items[0].pcXag.toFixed(2)}%` : "0%"}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center space-y-2">
      <h3 className="text-lg font-bold text-gray-800">Investment Options</h3>
      <div className="grid grid-rows-3 gap-2">
        {/* Gold Options */}
        <Card className="border-none shadow-sm">
          <div className="bg-gray-50 grid grid-cols-3 gap-2 text-center text-gray-700 text-sm font-semibold">
            {goldOptions.map((option, index) => (
              <Card 
                key={option.name} 
                className="shadow-none border-none relative"
                onMouseEnter={() => setHoveredCard({ type: 'gold', index })}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-2">
                  <img src={option.img} alt={option.name} className="w-8 h-8 mx-auto" />
                  <p>{option.name}</p>
                </CardContent>
                {hoveredCard?.type === 'gold' && hoveredCard.index === index && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80 rounded-md transition-all duration-300">
                    <Button asChild variant="default" size="sm">
                      <a href="" target="_blank" rel="noopener noreferrer">
                        Start Investment
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        {/* Silver Options */}
        <Card className="border-none shadow-sm">
          <div className="bg-gray-50 grid grid-cols-3 gap-2 text-center text-gray-700 text-sm font-semibold">
            {silverOptions.map((option, index) => (
              <Card 
                key={option.name} 
                className="shadow-none border-none relative"
                onMouseEnter={() => setHoveredCard({ type: 'silver', index })}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-2">
                  <img src={option.img} alt={option.name} className="w-8 h-8 mx-auto" />
                  <p>{option.name}</p>
                </CardContent>
                {hoveredCard?.type === 'silver' && hoveredCard.index === index && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80 rounded-md transition-all duration-300">
                    <Button asChild variant="default" size="sm">
                      <a href="" target="_blank" rel="noopener noreferrer">
                        Start Investment
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        {/* Bonds Options */}
        <Card className="border-none shadow-sm">
          <div className="border-gray-500 grid grid-cols-2 gap-2 text-center text-gray-700 text-sm font-semibold">
            {bondsOptions.map((option, index) => (
              <Card 
                key={option.name} 
                className="shadow-none border-none relative"
                onMouseEnter={() => setHoveredCard({ type: 'bonds', index })}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-2">
                  <img src={option.img} alt={option.name} className="w-8 h-8 mx-auto" />
                  <p>{option.name}</p>
                </CardContent>
                {hoveredCard?.type === 'bonds' && hoveredCard.index === index && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80 rounded-md transition-all duration-300">
                    <Button asChild variant="default" size="sm">
                      <a href="" target="_blank" rel="noopener noreferrer">
                        Start Investment
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

