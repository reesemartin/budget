import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BudgetLineStorage } from '../model/budgetLines'
import { mockBudgetLineFactory, convertBudgetLineDateToString } from '../lib/budgetFactory'

// dates are stored as strings
// be sure to parse the date if a Date object is desired when consuming
// convert date to a string when updating state

const initialState: BudgetLineStorage[] = [
  // should be set to blank init but mocking for dev and eventually this will just come from the db
  convertBudgetLineDateToString(mockBudgetLineFactory()),
  convertBudgetLineDateToString(mockBudgetLineFactory()),
  convertBudgetLineDateToString(mockBudgetLineFactory()),
  convertBudgetLineDateToString(mockBudgetLineFactory()),
]

export const budgetLinesSlice = createSlice({
  name: 'budgetLines',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addBudgetLine: (state, action: PayloadAction<BudgetLineStorage>) => {
      if (action.payload.id === 0) {
        // look up highest id and increment
        let highestID = 0
        state.map((budgetLine) => {
          if (budgetLine.id > highestID) highestID = budgetLine.id
        })
        action.payload.id = highestID + 1
      }

      state.push({ ...action.payload })
    },
    updateBudgetLine: (state, action: PayloadAction<BudgetLineStorage>) => {
      const {
        payload: { id, label, amount, date },
      } = action

      state = state.map((budgetLine) => (budgetLine.id === id ? { ...budgetLine, label, amount, date } : budgetLine))
      return state
    },
    removeBudgetLine: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((budgetLine) => budgetLine.id !== action.payload.id)
      return state
    },
  },
})

export const { addBudgetLine, updateBudgetLine, removeBudgetLine } = budgetLinesSlice.actions

export default budgetLinesSlice.reducer
