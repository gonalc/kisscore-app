const COLORS = {
  red: '#FF6961',
  darkRed: '#B64B45',
  gray: '#666666',
  lightRed: '#FF938E',
  pink: '#FF6191',
  blue: '#4169E1',
  navyBlue: '#000080',
  lightBlue: '#92A9ED',
  teal: '#41E1B9',
  whiteRed: '#FFE9E8',
  black: '#240E0D',
  background: '#F9F9F9',
  white: '#FFFFFF',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#9E4936',
  lightGray: '#F2F2F2'
}

export type Color = keyof typeof COLORS

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (result) {
    const red = parseInt(result[1], 16)
    const green = parseInt(result[2], 16)
    const blue = parseInt(result[3], 16)

    return `${red}, ${green}, ${blue}`
  }

  return '0, 0, 0'
}

export default COLORS
