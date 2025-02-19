import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
  const router = useRouter()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "products") {
      router.push("/products")
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

