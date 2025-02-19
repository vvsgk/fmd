"use client"

import { Search } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Modify Navbar to receive activePage prop
export function Navbar({ activePage }: { activePage: string }) {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex md:flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
                </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                    activePage === "overview" ? "text-primary" : "text-gray-400" // Highlight active link
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
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                    activePage === "products" ? "text-primary" : "text-gray-400" // Highlight active link
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
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                    activePage === "settings" ? "text-primary" : "text-gray-400" // Highlight active link
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
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
                    activePage === "settings" ? "text-primary" : "text-gray-400" // Highlight active link
                  )}
                >
                  Transfer
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
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
