import * as castle from 'castle-game'
import { UIAction } from '../UIAction'

export class PlaceTileUIAction extends UIAction {

  constructor (
    public readonly position: castle.Position,
    public readonly orientation: castle.Direction
  ) {
    super()
  }

}
