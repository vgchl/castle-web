import { Camera, Color4, DirectionalLight, Engine, Observable, Scene, UniversalCamera, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import React, { useEffect, useRef } from 'react'
import styles from './Viewport.module.css'
import { WorldView } from './world'

interface Props {
  readonly game: castle.Game
  readonly onGameChange: (game: castle.Game) => void
}

const observableGame = new Observable<castle.Game>()

const Viewport = ({ game, onGameChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let scene: Scene

  useEffect(() => {
    const canvas = canvasRef.current

    const engine = new Engine(canvas, true)
    scene = new Scene(engine)
    scene.clearColor = new Color4(0.95, 0.95, 0.95)

    const size = 10
    const camera = new UniversalCamera('UniversalCamera', new Vector3(size, size * 1.5, -size), scene)
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA
    camera.setTarget(Vector3.Zero())

    const light1 = new DirectionalLight('light', new Vector3(0, -1, 0), scene)
    light1.intensity = 1.00
    const light2 = new DirectionalLight('light', new Vector3(0, 0, 1), scene)
    light2.intensity = 0.90
    const light3 = new DirectionalLight('light', new Vector3(-1, 0, 0), scene)
    light3.intensity = 0.80

    const world = new WorldView(scene, observableGame)

    observableGame.add(game => {
      onGameChange(game)
      world.render(game)
      scene.render()
    })

    const resize = () => {
      engine.resize()
      const aspectRatio = engine.getAspectRatio(camera)
      const orthoSize = size
      camera.orthoTop = orthoSize
      camera.orthoBottom = -orthoSize
      camera.orthoLeft = -orthoSize * aspectRatio
      camera.orthoRight = orthoSize * aspectRatio
      scene.render()
    }

    resize()

    // engine.runRenderLoop(() => {
    scene.render()
    // })

    window.addEventListener('resize', resize)
  }, [])

  useEffect(() => {
    observableGame.notifyObservers(game)
  }, [game])

  return (
    <canvas ref={canvasRef} className={styles.Viewport} />
  )
}

export default Viewport
