import * as castle from 'castle-game'
import * as immutable from 'immutable'
import React, { Fragment, useState } from 'react'
import TurnControls from './TurnControls'
import Viewport from './Viewport'

const createGame = () => {
  const playerAlice: castle.Player = new castle.Player('Alice', 'red')
  const playerBob: castle.Player = new castle.Player('Bob', 'blue')
  return new castle.Game({
    world: new castle.World({
      tiles: immutable.Map<castle.Position, castle.PlacedTile>([[
        castle.Position.origin,
        new castle.PlacedTile(new castle.TileD(), castle.Position.origin, castle.Direction.north)
      ]])
    }),
    players: immutable.List([playerAlice, playerBob])
  })
}

const Castle = () => {
  const [game, setGame] = useState(createGame())

  return (
    <Fragment>
      <TurnControls game={game} onGameChange={setGame}/>
      <Viewport game={game} onGameChange={setGame} />
    </Fragment>
  )
}

export default Castle
