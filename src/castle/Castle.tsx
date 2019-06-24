import * as castle from 'castle-game'
import * as immutable from 'immutable'
import React, { Fragment, useReducer } from 'react'
import TurnControls from './TurnControls'
import Viewport from './Viewport'
import { reducer } from './ui/reducer'

const initializeState = () => {
  const playerAlice: castle.Player = new castle.Player('Alice', 'red')
  const playerBob: castle.Player = new castle.Player('Bob', 'blue')
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
      <TurnControls game={state.game} dispatch={dispatch} />
      <Viewport game={state.game} dispatch={dispatch} />
    </Fragment>
  )
}

export default Castle
