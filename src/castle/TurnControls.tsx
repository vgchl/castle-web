import * as castle from 'castle-game'
import React, { Fragment } from 'react'
import styles from './TurnControls.module.css'
import TurnTile from './TurnTile'
import * as ui from './ui'
import { mapPlayerColor } from './world/mapPlayerColor'

interface Props {
  readonly game: castle.Game
  readonly dispatch: ui.Dispatch
}

const TurnControls = ({ game, dispatch }: Props) => {
  const hasConfirmAction = game.actions.some(action => action instanceof castle.ConfirmAction)
  const hasUndoAction = hasConfirmAction
  const hasActions = hasConfirmAction || hasUndoAction

  const confirm = () => {
    dispatch(new ui.actions.ConfirmUIAction())
  }

  return (
    <div className={styles.TurnControls}>
      <div className={styles.TurnControl}>
        <div className={styles.TilesRemaining}>
          <div
            className={styles.TurnPlayer}
            style={{ borderTopColor: mapPlayerColor(game.currentTurn.player.color).toHexString() }}
          >
            {game.currentTurn.player.name}
          </div>
          <Fragment>
            <div>
              <TurnTile tile={game.currentTurn.currentTurnPart.tile} />
            </div>
            {game.tileSet.tilesRemaining} tiles remaining
          </Fragment>
        </div>
      </div>

      {hasActions && (
        <Fragment>
          <div className={styles.TurnControl}>
            <br/><br/><br/><br/>
          </div>
          <div className={styles.TurnControl}>
            {hasConfirmAction && (
              <button onClick={confirm} className={styles.Confirm}>
                ✔
              </button>
            )}
            {hasUndoAction && (
              <button className={styles.Undo}>
                ✕
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default TurnControls
