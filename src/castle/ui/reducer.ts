import { State } from './State'
import { UIAction } from './UIAction'
import * as actions from './actions'
import * as castle from 'castle-game'

export const reducer = (state: State, uiAction: UIAction): State => {

  if (uiAction instanceof actions.PlaceTileUIAction) {
    const action = state.game.actions
      .find(action => action instanceof castle.PlaceTileAction) as castle.PlaceTileAction
    const game = action.placeTile(uiAction.position, uiAction.orientation)
    return {
      ...state,
      game
    }
  }

  if (uiAction instanceof actions.ConfirmUIAction) {
    const action = state.game.actions
      .find(action => action instanceof castle.ConfirmAction) as castle.ConfirmAction
    const game = action.confirm()
    return {
      ...state,
      game
    }
  }

  if (uiAction instanceof actions.PlaceFigureUIAction) {
    const action = state.game.actions
      .find(action => action instanceof castle.PlaceFigureAction) as castle.PlaceFigureAction
    const game = action.placeFigure(uiAction.placedFigure)
    return {
      ...state,
      game
    }
  }

  return state
}
