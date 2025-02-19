"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Bell, X } from "lucide-react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const modules = [
  {
    id: "sip",
    number: "001",
    title: "SIP Calculator",
    description: "Calculate your investment returns with our advanced SIP planning tool.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/sipCal").then((mod) => mod.default)),
    position: { left: "0%", top: "0%" },
  },
  {
    id: "pm",
    number: "002",
    title: "Precious Metals",
    description: "Track and invest in gold, silver, and other precious metals.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/pmInv").then((mod) => mod.PreciousMetalsDashboard)),
    position: { left: "25%", top: "10%" },
  },
  {
    id: "ip",
    number: "003",
    title: "Property Investment",
    description: "Explore real estate opportunities and calculate returns.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/propertyInv").then((mod) => mod.PropertyInvestment)),
    position: { left: "50%", top: "0%" },
  },
  {
    id: "fd",
    number: "004",
    title: "FD Calculator",
    description: "Calculate fixed deposit returns across different periods.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/fd").then((mod) => mod.default)),
    position: { left: "0%", top: "45%" },
  },
  {
    id: "rd",
    number: "005",
    title: "RD Calculator",
    description: "Plan your recurring deposits and visualize growth.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/rd")),
    position: { left: "25%", top: "55%" },
  },
  {
    id: "nps",
    number: "006",
    title: "NPS Calculator",
    description: "Estimate your retirement savings with NPS calculator.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/nps")),
    position: { left: "50%", top: "45%" },
  },
  {
    id: "mf",
    number: "007",
    title: "Mutual Fund",
    description: "Explore mutual fund options and calculate returns.",
    image: "/placeholder.svg?height=80&width=80",
    component: dynamic(() => import("../Tools/fd")),
    position: { left: "0%", top: "90%" },
  },
  {
    id: "st",
    number: "008",
    title: "Stock Market",
    description: "Explore stock market options and calculate returns.",
    image: "/placeholder.svg?height=80&width=80",
    position: { left: "25%", top: "100%" },
  },
  {
    id: "cr",
    number: "009",
    title: "Cryptocurrency 1",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "50%", top: "90%" },
  },
  {
    id: "cr",
    number: "010",
    title: "Cryptocurrency 2",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "0%", top: "135%" },
  },
  {
    id: "cr",
    number: "011",
    title: "Cryptocurrency 3",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "25%", top: "145%" },
  },
  {
    id: "cr",
    number: "012",
    title: "Cryptocurrency 4",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "50%", top: "135%" },
  },
  {
    id: "cr",
    number: "013",
    title: "Cryptocurrency 5",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "0%", top: "180%" },
  },
  {
    id: "cr",
    number: "014",
    title: "Cryptocurrency 6",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "25%", top: "190%" },
  },
  {
    id: "cr",
    number: "015",
    title: "Cryptocurrency 7",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "50%", top: "180%" },
  },
  {
    id: "cr",
    number: "016",
    title: "Cryptocurrency 8",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "0%", top: "225%" },
  },
  {
    id: "cr",
    number: "017",
    title: "Cryptocurrency 9",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "25%", top: "235%" },
  },
  {
    id: "cr",
    number: "018",
    title: "Cryptocurrency 10",
    description: "Explore cryptocurrency options and calculate returns.",
    position: { left: "50%", top: "225%" },
  },
]

const notifications = [
  { id: 1, message: "New SIP rates available!" },
  { id: 2, message: "Gold prices have increased by 2%" },
  { id: 3, message: "Update your property portfolio" },
  { id: 4, message: "Fixed deposit rates have changed" },
  { id: 5, message: "New tax-saving investment options" },
  { id: 6, message: "Mutual fund NAV updates" },
  { id: 7, message: "Stock market closing summary" },
  { id: 8, message: "Cryptocurrency market trends" },
]

export function ExpandableModules() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const notificationRef = useRef<HTMLDivElement>(null)

  const handleModuleClick = async (moduleId: string) => {
    if (moduleId === expandedModule) {
      setExpandedModule(null)
    } else {
      setIsLoading(true)
      setExpandedModule(moduleId)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (notificationRef.current) {
      const headerHeight = 80 // Adjust this value based on your actual header height
      const maxTop = document.body.scrollHeight - notificationRef.current.offsetHeight - headerHeight
      const newTop = Math.min(scrollY + headerHeight, maxTop)
      notificationRef.current.style.top = `${newTop}px`
    }
  }, [scrollY])

  const ExpandedComponent = expandedModule ? modules.find((m) => m.id === expandedModule)?.component : null

  return (
    <div className="container mx-auto p-8">
      <div className="mb-16">
        <div className="text-sm font-mono text-neutral-500 mb-2">001</div>
        <h1 className="text-2xl font-mono text-neutral-800">CHAPTERS INDEX</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 pr-0 md:pr-8">
          {expandedModule ? (
            <div className="relative">
              <button
                onClick={() => setExpandedModule(null)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              {isLoading ? (
                <Card className="w-full h-[600px] flex items-center justify-center">
                  <Skeleton className="w-[80%] h-[80%]" />
                </Card>
              ) : (
                ExpandedComponent && <ExpandedComponent />
              )}
            </div>
          ) : (
            <div className="relative h-[800px]">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="absolute w-[300px] chapter-card"
                  style={{
                    left: module.position.left,
                    top: module.position.top,
                  }}
                >
                  <Card
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg bg-[hsl(var(--card-background))] border-none p-6"
                    onClick={() => handleModuleClick(module.id)}
                  >
                    <div className="space-y-4">
                      <div className="text-sm font-mono text-neutral-500">{module.number}</div>
                      <h2 className="font-mono uppercase text-lg tracking-wide">{module.title}</h2>
                      <p className="text-sm text-neutral-600 leading-relaxed">{module.description}</p>
                      <div className="mt-4 h-20 relative">
                        <Image
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <div
            ref={notificationRef}
            className="md:fixed md:w-1/4 transition-all duration-300 ease-in-out"
            style={{ maxWidth: "300px" }}
          >
            <Card className="bg-[hsl(var(--card-background))] border-none p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center mb-4 sticky top-0 bg-[hsl(var(--card-background))] py-2">
                <Bell className="h-5 w-5 mr-2" />
                <h2 className="font-mono uppercase text-lg tracking-wide">Notifications</h2>
              </div>
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li key={notification.id} className="text-sm text-neutral-600 border-b border-neutral-200 pb-2">
                    {notification.message}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

