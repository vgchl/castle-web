import { Camera, Color4, DirectionalLight, Engine, Scene, UniversalCamera, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import React, { useEffect, useRef } from 'react'
import styles from './TurnTile.module.css'
import { Tile } from './world'

interface Props {
  readonly tile: castle.Tile
}

const TurnTile = ({ tile }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    scene.clearColor = new Color4(0.95, 0.95, 0.95, 0)

    const size = 2.3
    const camera = new UniversalCamera('UniversalCamera', new Vector3(size, size * 1.5, -size), scene)
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA

    camera.setTarget(Vector3.Zero())

    Tile.create(tile, scene).render()

    const light1 = new DirectionalLight('light', new Vector3(0, -1, 0), scene)
    light1.intensity = 1.00
    const light2 = new DirectionalLight('light', new Vector3(0, 0, 1), scene)
    light2.intensity = 0.90
    const light3 = new DirectionalLight('light', new Vector3(-1, 0, 0), scene)
    light3.intensity = 0.80

    const resize = () => {
      engine.resize()
      let aspectRatio = engine.getAspectRatio(camera)
      let orthoSize = size
      camera.orthoTop = orthoSize
      camera.orthoBottom = -orthoSize
      camera.orthoLeft = -orthoSize * aspectRatio
      camera.orthoRight = orthoSize * aspectRatio
    }

    resize()

    // engine.runRenderLoop(() => {
    scene.render()
    // })

    window.addEventListener('resize', resize)
  }, [])

  // useEffect(() => {
  //   observableGame.notifyObservers(game)
  // }, [game])

  return (
    <canvas ref={canvasRef} className={styles.Canvas} />
  )
}

export default TurnTile
