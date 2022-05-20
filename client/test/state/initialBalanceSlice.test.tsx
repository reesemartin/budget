import { describe, it, expect } from 'vitest'
import { AnyAction, createAction } from '@reduxjs/toolkit'
import reducer, { InitialBalance, updateInitialBalance } from '../../src/state/initialBalanceSlice'

describe('initialBalanceSlice', () => {
  it('should return the initial state on init', () => {
    const previousState: InitialBalance = { value: 123 }
    expect(reducer({...previousState}, createAction<AnyAction>(''))).toEqual({...previousState})
  })

  it('should handle an item being added to an empty list', () => {
    const previousState: InitialBalance = { value: 0 }
    expect(reducer({...previousState}, updateInitialBalance(123))).toEqual({ value: 123 })
  })
})
