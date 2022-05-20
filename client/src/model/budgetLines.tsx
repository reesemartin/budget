export interface BudgetLineStorage {
  id: number
  label: string
  amount: number
  date: string // not recommended to store dates as Date objects so store as string and convert when using as needed
}

export interface BudgetLine {
  id: number
  label: string
  amount: number
  date: Date
}
