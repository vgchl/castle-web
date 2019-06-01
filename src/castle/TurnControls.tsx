import * as castle from 'castle-game'
import React, { Fragment } from 'react'
import styles from './TurnControls.module.css'
import TurnTile from './TurnTile'

interface Props {
  readonly game: castle.Game
  readonly onGameChange: (game: castle.Game) => void
}

const TurnControls = ({ game, onGameChange }: Props) => {
  const hasConfirmAction = game.actions.some(action => action instanceof castle.ConfirmAction)
  const hasUndoAction = hasConfirmAction
  const hasActions = hasConfirmAction || hasUndoAction

  const confirm = () => {
    onGameChange(
      game.actions
        .filter(action => action instanceof castle.ConfirmAction)
        .map(action => action as castle.ConfirmAction)
        .map(action => action!.confirm())
        .first()
    )
  }

  return (
    <div className={styles.TurnControls}>
      <div className={styles.TurnControl}>
        <div className={styles.TilesRemaining}>
        <div className={styles.TurnPlayer}>
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
