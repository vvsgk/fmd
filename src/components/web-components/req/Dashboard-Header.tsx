"use client"

import { Search } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const banks = [
  { id: "allbanks", name: "All Banks" },
  { id: "icici", name: "ICICI" },
  { id: "sbi", name: "SBI" },
  { id: "kotak", name: "Kotak" },
]

export function Navbar({ onBankChange }: { onBankChange: (bankId: string) => void }) {
  const [selectedBank, setSelectedBank] = useState(banks[0])

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = banks.find(bank => bank.id === event.target.value)
    if (selectedBank) {
      setSelectedBank(selectedBank)
      onBankChange(selectedBank.id)
    }
  }

  useEffect(() => {
    onBankChange(selectedBank.id)
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Bank Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedBank.id}
            onChange={handleBankChange}
            className="bg-transparent text-black border border-gray-300 px-3 py-2 rounded-md"
          >
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex md:flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                  )}
                >
                  Overview
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                  )}
                >
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                  )}
                >
                  Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/transfer" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                  )}
                >
                  Transfer
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 bg-white pl-9 text-black placeholder-gray-400 focus:ring-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  )
}