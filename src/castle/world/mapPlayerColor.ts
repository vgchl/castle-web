import * as castle from 'castle-game'
import { Color3 } from 'babylonjs'

export const mapPlayerColor = (color: castle.Color) => {
  switch (color) {
    case castle.Color.Red:
      return Color3.FromInts(219, 52, 52)
    case castle.Color.Blue:
      return Color3.FromInts(52, 152, 219)
    case castle.Color.Green:
      return Color3.FromInts(0, 255, 0)
    default:
      throw new Error('No mapping for color')
  }
}
