import {
  configureStore,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import budgetLinesSlice from './budgetLinesSlice'

export const store = configureStore({
  reducer: {
    budgetLines: budgetLinesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
