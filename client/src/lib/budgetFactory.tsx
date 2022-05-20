import { BudgetLine, BudgetLineStorage } from '../model/budgetLines'
import { toDecimalPlaces } from './utils'

let nextBudgetLineID = 1

// initialize a blank budget line
export const budgetLineFactory = (overrides = {}) => {
  return {
    id: nextBudgetLineID++,
    label: '',
    amount: 0,
    date: new Date(),
    ...overrides,
  }
}

// initialize a budget line with mock data
export const mockBudgetLineFactory = (overrides = {}) => {
  return budgetLineFactory({
    label: `Test ${nextBudgetLineID}`,
    amount: toDecimalPlaces(Math.random() * 100, 2) * (Math.floor(Math.random() * 100) % 2 === 0 ? 1 : -1),
    date: new Date(),
    ...overrides,
  })
}

// convert budget line date to a string because we store dates as strings in the state
export const convertBudgetLineDateToString = (budgetLine: BudgetLine): BudgetLineStorage => {
  return {
    ...budgetLine,
    date: budgetLine.date.toJSON(),
  }
}

// convert budget line date string to a date because we store dates as strings in the state
export const parseBudgetLineDate = (budgetLine: BudgetLineStorage): BudgetLine => {
  try {
    return {
      ...budgetLine,
      date: new Date(budgetLine.date),
    }
  } catch (err) {
    // invalid date
    return {
      ...budgetLine,
      date: new Date(),
    }
  }
}

// sort by date and then by label
// returns new array and does not modify original array
export const sortBudgetLines = (budgetLines: BudgetLine[]) => {
  let sortedBudgetLines = [...budgetLines]
  sortedBudgetLines.sort(function (a, b) {
    if (a.date < b.date) {
      return -1
    }
    if (a.date > b.date) {
      return 1
    }

    // date was equal so sort by label

    const labelA = a.label.toUpperCase() // ignore upper and lowercase
    const labelB = b.label.toUpperCase() // ignore upper and lowercase
    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }

    // labels and date must be equal
    return 0
  })

  return sortedBudgetLines
}
