import { NextResponse } from 'next/server'
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...')
    const client = await clientPromise
    console.log('Connected to client')
    
    const db = client.db("bank")
    console.log('Connected to database')
    
    const collections = await db.listCollections().toArray()
    console.log('Collections:', collections)
    
    return NextResponse.json({
      status: 'success',
      message: 'Connected to MongoDB',
      collections: collections.map(c => c.name)
    })
  } catch (error) {
    console.error('MongoDB Test Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({
      status: 'error',
      message: errorMessage
    }, { status: 500 })
  }
} 