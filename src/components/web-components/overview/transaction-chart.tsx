"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { fetchBankData } from "@/app/actions"
import type { Transaction } from "@/types/schema"

interface TransactionChartProps {
  className?: string
  selectedBank: string
}

export function TransactionChart({ className, selectedBank }: TransactionChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    async function loadChartData() {
      const data = (await fetchBankData(selectedBank)) as Transaction[]

      // Group transactions by date
      const groupedData = data.reduce(
        (acc, transaction) => {
          const date = transaction.TransactionDate.split("-")[1] // Get month
          if (!acc[date]) {
            acc[date] = { credit: 0, debit: 0 }
          }
          if (transaction.TransactionType === "Credit") {
            acc[date].credit += transaction.Amount
          } else {
            acc[date].debit += transaction.Amount
          }
          return acc
        },
        {} as Record<string, { credit: number; debit: number }>,
      )

      // Convert to chart format
      const chartData = Object.entries(groupedData).map(([month, data]) => ({
        name: month,
        credit: data.credit,
        debit: data.debit,
      }))

      setChartData(chartData)
    }
    loadChartData()
  }, [selectedBank])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Bar dataKey="credit" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            <Bar dataKey="debit" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-red-400" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

