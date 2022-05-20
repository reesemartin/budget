import { describe, it, expect } from 'vitest'
import {
  percentChange,
  toDecimalPlaces,
  toDecimalPlacesString,
  toLocaleDateISOString,
} from './../../src/lib/utils'

describe('percentChange', () => {
  it('should return percent difference between two numbers', () => {
    expect(percentChange(100, 75)).toEqual(-0.25)
    expect(percentChange(100, 50)).toEqual(-0.5)
    expect(percentChange(50, 75)).toEqual(0.5)
    expect(percentChange(50, 100)).toEqual(1)
  })

  it('should return zero if neither number is greater than zero', () => {
    expect(percentChange(0, 50)).toEqual(0)
    expect(percentChange(100, 0)).toEqual(0)
    expect(percentChange(0, 0)).toEqual(0)
  })
})

describe('toDecimalPlaces', () => {
  it('returns a number', () => {
    expect(typeof toDecimalPlaces(1.23456, 2)).toEqual(typeof 1.23)
    expect(typeof toDecimalPlaces('1.23456', 2)).toEqual(typeof 1.23)
  })

  it('just returns the passed number if the second parameter (places) is not zero or greater', () => {
    expect(toDecimalPlaces(1.23456)).toEqual(1.23456)
    expect(toDecimalPlaces(1.23456, -1)).toEqual(1.23456)
    expect(toDecimalPlaces(1.23456, null)).toEqual(1.23456)
  })

  it('rounds down to the nearest matching number of decimal places if passed a number with more decimal places than the second parameter (places)', () => {
    expect(toDecimalPlaces(1.23456, 2)).toEqual(1.23)
    expect(toDecimalPlaces(1.23456, 4)).toEqual(1.2345)
  })
})

describe('toDecimalPlacesString', () => {
  it('returns a string', () => {
    expect(typeof toDecimalPlacesString(1.23456, 2)).toEqual(typeof '1.23')
    expect(typeof toDecimalPlacesString('1.23456', 2)).toEqual(typeof '1.23')
  })

  it('just returns the passed number as a string if the second parameter (places) is not zero or greater', () => {
    expect(toDecimalPlacesString(1.23456)).toEqual('1.23456')
    expect(toDecimalPlacesString(1.23456, -1)).toEqual('1.23456')
    expect(toDecimalPlacesString(1.23456, null)).toEqual('1.23456')
  })

  it('adds zeroes to the end to reach the requested places if the second parameter (places) is more decimal places than the passed number', () => {
    expect(toDecimalPlacesString(1.2, 2)).toEqual('1.20')
    expect(toDecimalPlacesString(1.2, 4)).toEqual('1.2000')
  })
})

describe('toLocaleDateISOString', () => {
  it('returns blank if invalid date passed', () => {
    expect(toLocaleDateISOString()).toEqual('')
  })

  it('returns a YYYY-MM-DD string representation of the provided date', () => {
    expect(toLocaleDateISOString(new Date('2022-05-19T21:59:39.666Z'))).toEqual('2022-05-19')
  })

  it('properly adjusts the output date to the local timezone', () => {
    // UTC 3am to CDT should jump back a day because that's 10pm yesterday
    expect(toLocaleDateISOString(new Date('2022-05-19T03:00:00.001Z')), 'CDT').toEqual('2022-05-18')
  })
})