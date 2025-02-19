import { NextResponse } from 'next/server'
import type { Collection } from 'mongodb'

export async function GET() {
  try {
    // Log the URI (with password hidden)
    const uri = process.env.MONGODB_URI || 'not set'
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@')
    console.log('MongoDB URI:', maskedUri)

    const { MongoClient } = require('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI)
    
    await client.connect()
    const db = client.db('bank')
    const collections = await db.listCollections().toArray()
    
    await client.close()

    return NextResponse.json({
      success: true,
      message: 'Connected successfully',
      collections: collections.map((c: { name: string }) => c.name)
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Connection error:', errorMessage)
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      envSet: !!process.env.MONGODB_URI
    }, { status: 500 })
  }
} 