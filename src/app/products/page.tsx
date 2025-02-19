"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/web-components/overview/dashboard-shell"
import { Navbar } from "@/components/web-components/req/nonDashboard-Header"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import SipCalculator from "@/components/web-components/Tools/sipCal"
import { ExpandableModules } from "@/components/web-components/req/ExpandableModules"


const InvestmentCalculator = () => {
  return (
    <DashboardShell>
      <Navbar activePage="products" />
      <ExpandableModules />
    </DashboardShell>
  )
}

export default InvestmentCalculator

