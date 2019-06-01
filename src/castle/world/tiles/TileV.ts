import { Color3, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import { Tile } from '.'

export default class TileV extends Tile {

  constructor (
    public readonly position: castle.Position,
    scene: Scene
  ) {
    super(position)

    this.mesh = MeshBuilder.CreateBox('tile', { height: 0.5, width: 3, depth: 3 }, scene)
    this.mesh.position = new Vector3(this.position.x * 3, 0, this.position.y * 3)
    const material = new StandardMaterial('mat', scene)
    material.alpha = 1
    material.diffuseColor = Color3.FromInts(139, 180, 74)
    material.specularColor = new Color3(0.1, 0.1, 0.1)
    this.mesh.material = material

    const roadA = MeshBuilder.CreateGround('roadA', { width: 0.5, height: 1.75 }, scene)
    roadA.parent = this.mesh
    roadA.position = new Vector3(0, 0.251, -0.625)
    const roadMaterial = new StandardMaterial('mat', scene)
    roadMaterial.diffuseColor = Color3.FromInts(217, 210, 191)
    roadMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    roadA.material = roadMaterial

    const roadB = MeshBuilder.CreateGround('roadB', { width: 1.75, height: 0.5 }, scene)
    roadB.parent = this.mesh
    roadB.position = new Vector3(-0.625, 0.251, -0)
    roadB.material = roadMaterial
  }

}
