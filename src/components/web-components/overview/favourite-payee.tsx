"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface FavouritePayeeProps extends React.HTMLAttributes<HTMLDivElement> {}

const payees = [
  { name: "VVKRao", AccNo: "1234567890", image: "/avatars/03.png" },
  { name: "Maa", AccNo: "9876543210", image: "/avatars/02.png" },
  { name: "Basireddy", AccNo: "1122334455", image: "/avatars/04.png" },
  { name: "Kaushik", AccNo: "5566778899", image: "/avatars/02.png" },
  { name: "Vamsi", AccNo: "6677889900", image: "/avatars/03.png" },
];

export function FavouritePayee({ className, ...props }: FavouritePayeeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("p-4 space-y-4", className)} {...props}>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Favourite</h2>
          <p className="text-muted-foreground">You have recent transactions</p>
        </div>
      </div>

      {/* Border only on the section that contains the payees */}
      <div className="border rounded-lg p-3 space-y-6">
        {payees.map((payee, index) => (
          <div
            key={index}
            className="relative w-full h-16 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-md p-3 overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Default State: Avatar & Details */}
            <div className={cn("flex items-center space-x-3 w-full transition-opacity duration-300", hoveredIndex === index && "opacity-0")}>
              <Avatar className="h-10 w-10 border border-gray-300">
                <AvatarImage src={payee.image} alt={payee.name} />
              </Avatar>
              <div>
                <p className="text-l font-medium text-gray-900">{payee.name}</p>
                <p className="text-xs text-gray-500">Acc No: {payee.AccNo}</p>
              </div>
            </div>

            {/* Hover State: Only Show "Send" Button in Center */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200/70 rounded-md transition-all duration-300">
                <Button variant="default" size="sm">Send Now</Button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
