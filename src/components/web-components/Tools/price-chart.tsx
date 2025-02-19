"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value)

interface ChartDataItem {
  name: string
  gold: number
  silver: number
  date: Date
}

// Function to fetch and process data from JSON file in public folder
const fetchChartData = async (): Promise<ChartDataItem[]> => {
  try {
    const response = await fetch("/output.json")
    const data = await response.json()

    return data.map((item: { Date: string; "1 Gm Gold": number; "1 Gm Silver": number }) => ({
      name: new Date(item.Date.split("/").reverse().join("-")).toLocaleDateString(),
      gold: item["1 Gm Gold"],
      silver: item["1 Gm Silver"],
      date: new Date(item.Date.split("/").reverse().join("-"))
    })).sort((a: ChartDataItem, b: ChartDataItem) => a.date.getTime() - b.date.getTime())
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return []
  }
}

export default function PriceTrendChart() {
  const [timeRange, setTimeRange] = useState("1y")
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  useEffect(() => {
    fetchChartData().then(setChartData)
  }, [])

  const filterChartData = (data: ChartDataItem[], range: string) => {
    const now = new Date()
    let startDate = new Date()

    switch (range) {
      case "1m":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "3m":
        startDate.setMonth(now.getMonth() - 3)
        break
      case "6m":
        startDate.setMonth(now.getMonth() - 6)
        break
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case "2y":
        startDate.setFullYear(now.getFullYear() - 2)
        break
      case "3y":
        startDate.setFullYear(now.getFullYear() - 3)
        break
      case "4y":
        startDate.setFullYear(now.getFullYear() - 4)
        break
      case "5y":
        startDate.setFullYear(now.getFullYear() - 5)
        break
      case "max":
        startDate = new Date(Math.min(...data.map((item) => item.date.getTime()))) // Find the earliest date
        break
      default:
        startDate.setMonth(now.getMonth() - 1)
    }

    return data.filter((item) => item.date >= startDate)
  }

  const filteredData = filterChartData(chartData, timeRange)

  return (
    <Card className="p-4">
      <CardTitle className="mb-4">Price Trend</CardTitle>
      <Select onValueChange={(value) => setTimeRange(value)} value={timeRange}>
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Select a time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1m">1 Month</SelectItem>
          <SelectItem value="3m">3 Months</SelectItem>
          <SelectItem value="6m">6 Months</SelectItem>
          <SelectItem value="1y">1 Year</SelectItem>
          <SelectItem value="2y">2 Years</SelectItem>
          <SelectItem value="3y">3 Years</SelectItem>
          <SelectItem value="4y">4 Years</SelectItem>
          <SelectItem value="5y">5 Years</SelectItem>
          <SelectItem value="max">Max</SelectItem>
        </SelectContent>
      </Select>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatINR(Number(value))} labelFormatter={(value) => value} />
            <Area
              type="monotone"
              dataKey="gold"
              stackId="1"
              name="Gold"
              stroke="#FFD700"
              fill="#FFD700"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ stroke: "#FFD700", strokeWidth: 2, r: 2 }}
              activeDot={{ stroke: "#FFD700", strokeWidth: 2, r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="silver"
              stackId="2"
              name="Silver"
              stroke="#C0C0C0"
              fill="#C0C0C0"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ stroke: "#C0C0C0", strokeWidth: 2, r: 2 }}
              activeDot={{ stroke: "#C0C0C0", strokeWidth: 2, r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}