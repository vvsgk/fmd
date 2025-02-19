"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchBankData } from "@/app/actions"
import type { Transaction } from "@/types/schema"

interface TransactionMetricsProps {
  selectedBank: string
}

export function TransactionMetrics({ selectedBank }: TransactionMetricsProps) {
  const [metrics, setMetrics] = useState({
    totalBal: 0,
    lastMOnthDebit: 0,
    totalTransactions: 0,
    activeAccounts: 0,
  })

  useEffect(() => {
    async function loadMetrics() {
      const data = (await fetchBankData(selectedBank)) as Transaction[]

      const firstTransaction = data[0]
      const firstTransactionDate = new Date(data[0].TransactionDate)
      const oneMonthBefore = new Date(firstTransactionDate)
      oneMonthBefore.setMonth(firstTransactionDate.getMonth() - 1)

      // Filter transactions within the date range (from one month before to the first transaction date)
      const sum = data
        .filter(
          (t) => new Date(t.TransactionDate) >= oneMonthBefore && new Date(t.TransactionDate) <= firstTransactionDate,
        )
        .reduce((sum, t) => sum + t.Amount, 0)

      const totalBal = firstTransaction.Balance

      const lastMOnthDebit = sum

      const uniqueAccounts = selectedBank === "allbanks" ? 3 : 1

      setMetrics({
        totalBal,
        lastMOnthDebit,
        totalTransactions: data.length,
        activeAccounts: uniqueAccounts,
      })
    }
    loadMetrics()
  }, [selectedBank])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{metrics.totalBal.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+2.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Previous Month Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{metrics.lastMOnthDebit.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+18.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalTransactions}</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeAccounts}</div>
          <p className="text-xs text-muted-foreground">+1 since last 1 year</p>
        </CardContent>
      </Card>
    </>
  )
}

