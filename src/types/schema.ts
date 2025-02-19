export interface Transaction {
    _id: string
    TransactionID: string
    TransactionDate: string
    TransactionType: "Credit" | "Debit"
    Amount: number
    Currency: string
    AccountID: string
    Source: string
    Destination: string
    Status: string
    ReferenceNumber: string
    Description: string
    Balance: number
  }
  
  