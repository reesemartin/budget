export const percentChange = (a: number, b: number): number => {
  if (!(a > 0) || !(b > 0)) {
    return 0 // bad data
  }

  return b / a - 1
}

export const toDecimalPlaces = (number: number | string, places?: number | undefined): number => {
  number = Number(number)
  if (places !== 0 && (!places || isNaN(places) || places < 0)) return number
  return Math.floor(number * Math.pow(10, places)) / Math.pow(10, places)
}

export const toDecimalPlacesString = (number: number | string, places?: number | undefined): string => {
  if (places !== 0 && (!places || isNaN(places) || places < 0)) return String(number)
  return toDecimalPlaces(number, places).toFixed(places)
}

export const toLocaleDateISOString = (date?: Date | null, timeZone?: string) => {
  if (!date) {
    return ''
  }

  const dateString = date.toLocaleDateString(undefined, { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
  const dateParts = dateString.split('/')

  return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}` // YYYY-MM-DD
}
