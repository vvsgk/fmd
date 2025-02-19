"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartLegend } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface ResultType {
  yearlyData: Array<{
    year: number
    invested: number
    wealth: number
  }>
  invested: number
  wealth: number
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

const SipCalculator = () => {
  const [investmentType, setInvestmentType] = useState("sip")
  const [amount, setAmount] = useState(2500)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(20)
  const [stepUpRate, setStepUpRate] = useState(10)
  const [result, setResult] = useState<ResultType>({ yearlyData: [], invested: 0, wealth: 0 })

  const calculateInvestment = () => {
    let yearlyData = []
    let invested = amount
    let wealth = amount
    let annualRate = rate / 100

    if (investmentType === "lumpsum") {
      for (let i = 1; i <= years; i++) {
        wealth = amount * Math.pow(1 + annualRate, i)
        yearlyData.push({
          year: i,
          invested: amount,
          wealth: wealth,
        })
      }
    } else {
      let monthlyInvestment = amount
      let monthlyRate = annualRate / 12
      invested = 0
      wealth = 0
      
      for (let i = 1; i <= years; i++) {
        let yearlyInvested = 0
        let yearlyWealth = wealth
        
        for (let j = 0; j < 12; j++) {
          yearlyInvested += monthlyInvestment
          yearlyWealth = (yearlyWealth + monthlyInvestment) * (1 + monthlyRate)
        }
        
        invested += yearlyInvested
        wealth = yearlyWealth
        
        yearlyData.push({
          year: i,
          invested: invested,
          wealth: wealth,
        })
        
        if (investmentType === "stepup") {
          monthlyInvestment += (monthlyInvestment * stepUpRate) / 100
        }
      }
    }

    setResult({ yearlyData, invested, wealth })
  }

  useEffect(() => {
    calculateInvestment()
  }, [amount, rate, years, investmentType, stepUpRate])

  const chartConfig = {
    invested: {
      label: "Invested Amount",
      color: "hsl(var(--chart-1))",
    },
    wealth: {
      label: "Wealth",
      color: "hsl(var(--chart-2))",
    },
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg">
          <p className="font-bold">Year {label}</p>
          <p>Invested: ₹{payload[0].value.toLocaleString()}</p>
          <p>Wealth: ₹{payload[1].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full h-full p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Investment Type</Label>
            <Select value={investmentType} onValueChange={setInvestmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select investment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sip">SIP</SelectItem>
                <SelectItem value="lumpsum">Lumpsum</SelectItem>
                <SelectItem value="stepup">Step-up SIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{investmentType === "lumpsum" ? "Investment Amount (₹)" : "Monthly Investment (₹)"}</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>Return Rate (%)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>Time Period (Years)</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} />
          </div>
          {investmentType === "stepup" && (
            <div>
              <Label>Annual Step-up Rate (%)</Label>
              <Input type="number" value={stepUpRate} onChange={(e) => setStepUpRate(Number(e.target.value) || 0)} />
            </div>
          )}
        </div>
        <Button onClick={calculateInvestment} className="w-full bg-gray-900 text-white">
          Calculate
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">Total Invested</p>
            <p className="text-2xl font-bold">₹{result.invested.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">Total Wealth</p>
            <p className="text-2xl font-bold">₹{result.wealth.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">Wealth Gained</p>
            <p className="text-2xl font-bold">₹{(result.wealth - result.invested).toLocaleString()}</p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="h-[400px] mr-auto ml-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.yearlyData}>
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--foreground))" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--foreground))" }} tickFormatter={(value) => `₹${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="invested" stackId="a" fill="var(--color-invested)" />
              <Bar dataKey="wealth" stackId="a" fill="var(--color-wealth)" />
              <ChartLegend />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SipCalculator