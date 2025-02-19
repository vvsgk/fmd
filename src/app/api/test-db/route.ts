import { NextResponse } from 'next/server'
import clientPromise from "@/lib/mongodb"

interface CollectionResults {
  [key: string]: number | string;
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("bank")
    
    // Test if collections exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(col => col.name)
    
    // Test if we can query each collection
    const results: CollectionResults = {}
    for (const name of ['icici', 'sbi', 'kotak']) {
      if (collectionNames.includes(name)) {
        const count = await db.collection(name).countDocuments()
        results[name] = count
      } else {
        results[name] = 'Collection not found'
      }
    }

    return NextResponse.json({ 
      status: "Connected successfully to MongoDB",
      collections: results
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({ 
      status: "Failed to connect to MongoDB", 
      error: errorMessage 
    }, { status: 500 })
  }
} 