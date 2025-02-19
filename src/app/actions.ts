"use server"

import clientPromise from "@/lib/mongodb"

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: Error | null = null
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (i < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      }
    }
  }
  
  throw lastError
}

export async function fetchBankData(collection: string) {
  try {
    return await withRetry(async () => {
      const client = await clientPromise
      const db = client.db("bank")
      
      // If allbanks is selected, fetch from all collections
      if (collection === "allbanks") {
        const allData = await Promise.all([
          db.collection("icici").find({}).sort({ TransactionDate: -1 }).toArray(),
          db.collection("sbi").find({}).sort({ TransactionDate: -1 }).toArray(),
          db.collection("kotak").find({}).sort({ TransactionDate: -1 }).toArray()
        ])
        
        // Combine and sort all data
        const combinedData = allData.flat()
          .sort((a, b) => new Date(b.TransactionDate).getTime() - new Date(a.TransactionDate).getTime())
        
        return JSON.parse(JSON.stringify(combinedData))
      }
      
      // Fetch from specific bank collection
      const data = await db.collection(collection)
        .find({})
        .sort({ TransactionDate: -1 })
        .toArray()
      
      return JSON.parse(JSON.stringify(data))
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return []
  }
}

export async function fetchCollections() {
  try {
    return await withRetry(async () => {
      const client = await clientPromise
      const db = client.db("bank")
      const collections = await db.listCollections().toArray()
      return collections.map((col) => col.name)
    })
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

