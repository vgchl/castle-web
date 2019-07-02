import * as castle from 'castle-game'
import * as immutable from 'immutable'
import React, { useReducer, Fragment } from 'react'
import TurnControls from './TurnControls'
import Viewport from './Viewport'
import { reducer } from './ui/reducer'
import styles from './Castle.module.css'
import { Scoreboard } from './Scoreboard'

const initializeState = () => {
  const playerAlice: castle.Player = new castle.Player('Alice', castle.Color.Red)
  const playerBob: castle.Player = new castle.Player('Bob', castle.Color.Blue)
  const game = new castle.Game({
    world: new castle.World({
      tiles: immutable.Map<castle.Position, castle.PlacedTile>([[
        castle.Position.origin,
        new castle.PlacedTile(new castle.TileD(), castle.Position.origin, castle.Direction.north)
      ]])
    }),
    players: immutable.List([playerAlice, playerBob])
  })
  return { game }
}

const Castle = () => {
  const [state, dispatch] = useReducer(reducer, null, initializeState)

  return (
    <Fragment>
      <div className={styles.sidebar}>
        <div className={styles.sidebarItem}>
          <TurnControls game={state.game} dispatch={dispatch} />
        </div>
        <div className={[styles.sidebarItem, styles.scoreboard].join(' ')}>
          <Scoreboard game={state.game} />
        </div>
      </div>
      <Viewport game={state.game} dispatch={dispatch} />
    </Fragment>
  )
}

export default Castle
