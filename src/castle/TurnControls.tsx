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
  const canConfirm = game.actions.some(action => action instanceof castle.ConfirmAction)
  const canUndo = canConfirm

  const confirm = () => {
    if (canConfirm) {
      dispatch(new ui.actions.ConfirmUIAction())
    }
  }

  const playerColor = mapPlayerColor(game.currentTurn.player.color).toHexString()

  return (
    <Fragment>
        <h1 className={styles.turnPlayer} style={{ color: playerColor }}>
          {game.currentTurn.player.name}
        </h1>
        <div className={styles.turnTile}>
          <TurnTile tile={game.currentTurn.currentTurnPart.tile} />
        </div>
        <div className={styles.tilesRemaining}>
          {game.tileSet.tilesRemaining} tiles remaining
        </div>
        <div className={styles.actionBar} style={{ borderColor: playerColor }}>
            <button disabled={!canConfirm} onClick={confirm} className={styles.confirm}>
              ✔
            </button>
            <button disabled={!canUndo} className={styles.undo}>
              ✕
            </button>
        </div>

    </Fragment>
  )
}

export default TurnControls
