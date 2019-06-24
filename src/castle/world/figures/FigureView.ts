import { Mesh, MeshBuilder, StandardMaterial, Color3, Scene } from 'babylonjs'
import * as castle from 'castle-game'
import { mapPlayerColor } from '../mapPlayerColor'

export default class FigureView {

  public static create (figure: castle.Figure, color: castle.Color, scene: Scene): FigureView {
    if (figure.isFollower) {
      return new FigureView(scene, color)
    }
    throw new Error('Unsupported figure type')
  }

  public mesh?: Mesh

  protected constructor (
    protected readonly scene: Scene,
    private readonly color: castle.Color
  ) {}

  public render () {
    if (this.mesh) {
      return
    }

    this.mesh = MeshBuilder.CreateBox('tile', { height: 1, width: 0.5, depth: 0.5 }, this.scene)
    const material = new StandardMaterial('mat', this.scene)
    material.alpha = 1
    material.diffuseColor = mapPlayerColor(this.color)
    material.specularColor = new Color3(0.1, 0.1, 0.1)
    this.mesh.material = material
  }

  public delete () {
    if (this.mesh) {
      this.mesh.dispose()
    }
  }

}
