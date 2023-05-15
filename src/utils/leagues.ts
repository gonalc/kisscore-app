import COLORS from './colors'

type TPositionColor = {
  text: string
  background: string
}

export function getPositionColor(position: number): TPositionColor {
  if (position === 1) {
    return {
      background: COLORS.gold,
      text: COLORS.black
    }
  }

  if (position === 2) {
    return {
      background: COLORS.silver,
      text: COLORS.black
    }
  }

  if (position === 3) {
    return {
      background: COLORS.bronze,
      text: COLORS.white
    }
  }

  return {
    background: COLORS.navyBlue,
    text: COLORS.white
  }
}
