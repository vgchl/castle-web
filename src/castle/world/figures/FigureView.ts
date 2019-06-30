import { Mesh, MeshBuilder, StandardMaterial, Color3, Scene, Vector3 } from 'babylonjs'
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

  public render (parentMesh: Mesh, position: Vector3) {
    if (this.mesh) {
      return
    }

    const offset = new Mesh('figure-offset', this.scene, parentMesh)
    offset.isVisible = false
    offset.position = position

    this.mesh = MeshBuilder.CreateBox('figure', { height: 1, width: 0.4, depth: 0.4 }, this.scene)
    this.mesh.parent = offset
    this.mesh.position = new Vector3(0, 0.5, 0)

    const material = new StandardMaterial('mat', this.scene)
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
