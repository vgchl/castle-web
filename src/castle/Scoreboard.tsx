import { default as React, Fragment } from 'react'
import * as castle from 'castle-game'
import styles from './Scoreboard.module.css'
import { mapPlayerColor } from './world/mapPlayerColor'

interface Props {
  game: castle.Game
}

export const Scoreboard = ({ game }: Props) => {
  const scores = new Map<castle.Player, number>()

  game.players.forEach(player => scores.set(player!, 0))

  game.turns.forEach(turn => {
    turn!.scores.forEach(score => {
      const total = (scores.get(score!.player) || 0) + score!.points
      scores.set(score!.player, total)
    })
  })

  return (
    <Fragment>
      {Array.from(scores.entries()).map(([player, points]) => (
        <div key={player.name} className={styles.score}>
          <div className={styles.player}>
            <i style={{ background: mapPlayerColor(player.color).toHexString() }}></i>
            {player.name}
          </div>
          <div className={styles.points}>
           {points}
          </div>
        </div>
      ))}
    </Fragment>
  )
}
