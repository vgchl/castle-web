import { Camera, Color4, DirectionalLight, Engine, Scene, UniversalCamera, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import React, { useEffect, useRef } from 'react'
import styles from './Viewport.module.css'
import { WorldView } from './world'
import * as ui from './ui'

interface Props {
  readonly game: castle.Game
  readonly dispatch: ui.Dispatch
}

const Viewport = ({ game, dispatch }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<Scene>()
  const worldViewRef = useRef<WorldView>()

  useEffect(() => {
    const canvas = canvasRef.current

    const engine = new Engine(canvas, true)
    const scene = sceneRef.current = new Scene(engine)
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

    const worldView = worldViewRef.current = new WorldView(scene, dispatch)

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
    worldView.render(game)
    scene.render()
    // })

    window.addEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const scene = sceneRef.current!
    const worldView = worldViewRef.current!

    worldView.render(game)
    scene.render()
  }, [game])

  return (
    <canvas ref={canvasRef} className={styles.Viewport} />
  )
}

export default Viewport
