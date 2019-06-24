import { UIAction } from '../UIAction'
import * as castle from 'castle-game'

export class PlaceFigureUIAction extends UIAction {

  constructor (
    public readonly placedFigure: castle.PlacedFigure
  ) {
    super()
  }

}
