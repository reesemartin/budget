import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialBalance {
  value: number
}

const initialState: InitialBalance = { value: 1000 } // placeholder dev value that should come from database eventually

export const initialBalanceSlice = createSlice({
  name: 'initialBalance',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateInitialBalance: (state, action: PayloadAction<number>) => {
      console.log(action.payload)
      state.value = action.payload
    },
  },
})

export const { updateInitialBalance } = initialBalanceSlice.actions

export default initialBalanceSlice.reducer
