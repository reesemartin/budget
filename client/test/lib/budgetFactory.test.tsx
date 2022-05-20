import { describe, it, expect } from 'vitest'
import {
  budgetLineFactory,
  mockBudgetLineFactory,
  convertBudgetLineDateToString,
  sortBudgetLines,
} from './../../src/lib/budgetFactory'
import { BudgetLine } from '../../src/model/budgetLines'

describe('budgetLineFactory', () => {
  it('initializes a blank budget line and accepts overrides', () => {
    const date = new Date() // have to override date since the ms between expect and toEqual results in differing dates
    expect(budgetLineFactory({ date })).toEqual({
      id: 1,
      label: '',
      amount: 0,
      date: date,
    })
  })
})

describe('convertBudgetLineDateToString', () => {
  it('converts the date property of a budget line object if that date is a Date object instance', () => {
    const newBudgetLine = mockBudgetLineFactory({ date: new Date('2022-05-20T01:44:15.827Z') })
    expect(convertBudgetLineDateToString(newBudgetLine)).toEqual({
      ...newBudgetLine,
      date: '2022-05-20T01:44:15.827Z',
    })
  })
})

describe('sortBudgetLines', () => {
  it('should return budget lines sorted by date and then label', () => {
    const previousState: BudgetLine[] = [
      {
        id: 1,
        label: 'b test',
        amount: 10,
        date: new Date('2022-05-06T23:55:49.650Z'),
      },
      {
        id: 2,
        label: 'test 2',
        amount: 20,
        date: new Date('2022-05-05T23:45:42.220Z'),
      },
      {
        id: 3,
        label: 'a test',
        amount: 10,
        date: new Date('2022-05-06T23:55:49.650Z'),
      },
      {
        id: 4,
        label: 'c test',
        amount: -10,
        date: new Date('2022-05-08T23:55:49.650Z'),
      },
    ]

    expect(sortBudgetLines(previousState)).toEqual([
      {
        id: 2,
        label: 'test 2',
        amount: 20,
        date: new Date('2022-05-05T23:45:42.220Z'),
      },
      {
        id: 3,
        label: 'a test',
        amount: 10,
        date: new Date('2022-05-06T23:55:49.650Z'),
      },
      {
        id: 1,
        label: 'b test',
        amount: 10,
        date: new Date('2022-05-06T23:55:49.650Z'),
      },
      {
        id: 4,
        label: 'c test',
        amount: -10,
        date: new Date('2022-05-08T23:55:49.650Z'),
      },
    ])
  })
})
