"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/web-components/overview/dashboard-header"
import { DashboardShell } from "@/components/web-components/overview/dashboard-shell"
import { DashboardTabs } from "@/components/web-components/overview/dashboard-tabs"
import { TransactionMetrics } from "@/components/web-components/overview/transaction-metrics"
import { TransactionChart } from "@/components/web-components/overview/transaction-chart"
import { RecentTransactions } from "@/components/web-components/overview/recent-transactions"
import { FavouritePayee } from "@/components/web-components/overview/favourite-payee"
import { Navbar } from "@/components/web-components/req/Dashboard-Header"

export default function DashboardPage() {
  const router = useRouter()
  const [selectedBank, setSelectedBank] = useState("allbanks")
  const [activeTab, setActiveTab] = useState("overview")

  const handleBankChange = (bankId: string) => {
    setSelectedBank(bankId)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "products") {
      router.push("/products")
    }
  }

  return (
    <DashboardShell>
      <Navbar onBankChange={handleBankChange} />
      <DashboardHeader 
        selectedBank={selectedBank}
        onBankChange={handleBankChange}
      />
      <DashboardTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TransactionMetrics selectedBank={selectedBank} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <TransactionChart className="col-span-3" selectedBank={selectedBank} />
        <RecentTransactions className="col-span-3" selectedBank={selectedBank} />
        <FavouritePayee className="col-span-1" />
      </div>
    </DashboardShell>
  )
}