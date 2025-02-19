"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DashboardHeaderProps {
  selectedBank?: string;
  onBankChange?: (bank: string) => void;
}

export function DashboardHeader({ selectedBank, onBankChange }: DashboardHeaderProps = {}) {
  const banks = [
    { id: "allbanks", name: "All Banks" },
    { id: "icici", name: "ICICI" },
    { id: "sbi", name: "SBI" },
    { id: "kotak", name: "Kotak" },
  ]

  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">View and Manage Accounts</p>
      </div>
    </div>
  )
}

