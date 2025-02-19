"use client"

import { useEffect, useState } from "react"
import { fetchBankData } from "@/app/actions"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/types/schema"
import type React from "react"

interface RecentTransactionsProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedBank: string
}

export function RecentTransactions({ className, selectedBank, ...props }: RecentTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalTransactions, setTotalTransactions] = useState(0)

  const transactionsPerPage = 5

  useEffect(() => {
    async function loadTransactions() {
      const data = (await fetchBankData(selectedBank)) as Transaction[]
      const limitedData = data.slice(0, 50)
      setTotalTransactions(limitedData.length)
      setTransactions(data.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage))
    }
    loadTransactions()
  }, [currentPage, selectedBank])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={cn("p-4 space-y-4", className)} {...props}>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
          <p className="text-muted-foreground">You have {transactions.length} recent transactions</p>
        </div>
      </div>
      <div className="rounded-md border">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="relative flex items-center justify-between p-5 hover:bg-transparent transition duration-300 group"
          >
            {/* Non-hover state */}
            <div className="grid gap-1">
              <p className="font-medium">{transaction.TransactionID}</p>
              <p className="text-sm text-muted-foreground">{transaction.Description}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`
                    text-right 
                    font-bold 
                    text-lg 
                    ${transaction.TransactionType === "Credit" ? "text-green-500" : "text-red-500"}
                  `}
              >
                {transaction.TransactionType === "Credit" ? "+" : "-"}₹{transaction.Amount}
              </span>
              <span className="text-xs text-muted-foreground">{transaction.TransactionDate}</span>
            </div>

            {/* Hover Details - Hidden by Default */}
            <div className="absolute inset-0 bg-opacity-100 opacity-0 bg-gray-200/70 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 p-4 rounded-md shadow-lg grid grid-cols-3 gap-2">
              {/* First Row: TransactionID | Source | Description */}
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Transaction ID</span>
                <span>{transaction.TransactionID}</span>
              </div>
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Source</span>
                <span>{transaction.Source}</span>
              </div>
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Description</span>
                <span>{transaction.Description}</span>
              </div>

              {/* Second Row: TransactionDate | Destination | Balance */}
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Transaction Date</span>
                <span>{transaction.TransactionDate}</span>
              </div>
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Destination</span>
                <span>{transaction.Destination}</span>
              </div>
              <div className="flex flex-col text-xs font-bold">
                <span className="font-medium">Balance</span>
                <span>₹{transaction.Balance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalTransactions / transactionsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalTransactions / transactionsPerPage)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

