import { describe, it, expect } from 'vitest'
import { AnyAction, createAction } from '@reduxjs/toolkit'
import reducer, { addBudgetLine, updateBudgetLine, removeBudgetLine } from '../../src/state/budgetLinesSlice'
import { BudgetLineStorage } from '../../src/model/budgetLines'
import { mockBudgetLineFactory, convertBudgetLineDateToString } from '../../src/lib/budgetFactory'

describe('budgetLinesSlice', () => {
  it('should return the initial state on init', () => {
    const previousState: BudgetLineStorage[] = [
      convertBudgetLineDateToString(mockBudgetLineFactory()),
      convertBudgetLineDateToString(mockBudgetLineFactory()),
    ]
    expect(reducer([...previousState], createAction<AnyAction>(''))).toEqual([...previousState])
  })

  it('should handle an item being added to an empty list', () => {
    const previousState = []
    const mockBudgetLine = convertBudgetLineDateToString(mockBudgetLineFactory())
    expect(reducer(previousState, addBudgetLine({ ...mockBudgetLine }))).toEqual([{ ...mockBudgetLine }])
  })

  it('should handle an item being added to an existing list', () => {
    const previousState = [convertBudgetLineDateToString(mockBudgetLineFactory())]
    const mockBudgetLine = convertBudgetLineDateToString(mockBudgetLineFactory())
    expect(reducer(previousState, addBudgetLine({ ...mockBudgetLine }))).toEqual([
      ...previousState,
      { ...mockBudgetLine },
    ])
  })

  it('should autogenerate an id if an id of zero is passed based on the highest id in the state', () => {
    const previousState = [convertBudgetLineDateToString(mockBudgetLineFactory())]
    const mockBudgetLine = { ...convertBudgetLineDateToString(mockBudgetLineFactory()), id: 0 }
    expect(reducer(previousState, addBudgetLine({ ...mockBudgetLine }))).toEqual([
      ...previousState,
      { ...mockBudgetLine, id: previousState[0].id + 1 },
    ])
  })

  it('should handle an item being edited in an existing list', () => {
    const previousState: BudgetLineStorage[] = [
      convertBudgetLineDateToString(mockBudgetLineFactory()),
      convertBudgetLineDateToString(mockBudgetLineFactory()),
    ]
    expect(
      reducer(
        previousState,
        updateBudgetLine({
          ...previousState[0],
          label: 'test 123',
        })
      )
    ).toEqual([
      {
        ...previousState[0],
        label: 'test 123',
      },
      {
        ...previousState[1],
      },
    ])
  })

  it('should handle an item being removed from an existing list', () => {
    const previousState: BudgetLineStorage[] = [
      convertBudgetLineDateToString(mockBudgetLineFactory()),
      convertBudgetLineDateToString(mockBudgetLineFactory()),
    ]
    expect(
      reducer(
        previousState,
        removeBudgetLine({
          id: previousState[0].id,
        })
      )
    ).toEqual([
      {
        ...previousState[1],
      },
    ])
  })
})
