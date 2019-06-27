import { Color3, MeshBuilder, StandardMaterial, Vector3 } from 'babylonjs'
import { TileView } from '../tiles'

export default class TileDView extends TileView {

  protected figurePositionsBySegmentId: Map<string, Vector3> = new Map([
    ['roadA', new Vector3(0, 0.75, 0)],
    ['cityA', new Vector3(1.125, 0.75, 0)],
    ['farmA', new Vector3(-0.865, 0.75, 1)],
    ['farmB', new Vector3(0.5, 0.75, -1)]
  ])

  protected renderTile () {
    if (this.mesh) {
      return
    }

    this.mesh = MeshBuilder.CreateBox('tile', { height: 0.5, width: 3, depth: 3 }, this.scene)
    const material = new StandardMaterial('mat', this.scene)
    material.alpha = 1
    material.diffuseColor = Color3.FromInts(139, 180, 74)
    material.specularColor = new Color3(0.1, 0.1, 0.1)
    this.mesh.material = material

    const road = MeshBuilder.CreateGround('road', { width: 0.5, height: 3 }, this.scene)
    road.parent = this.mesh
    road.position = new Vector3(0, 0.251, 0)
    const roadMaterial = new StandardMaterial('mat', this.scene)
    roadMaterial.diffuseColor = Color3.FromInts(217, 210, 191)
    roadMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    road.material = roadMaterial

    const city = MeshBuilder.CreateGround('road', { height: 3, width: 0.75 }, this.scene)
    city.parent = this.mesh
    city.position = new Vector3((3 - .75) / 2, 0.251, 0)
    const cityMaterial = new StandardMaterial('mat', this.scene)
    cityMaterial.diffuseColor = Color3.FromInts(180, 139, 94)
    cityMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    city.material = cityMaterial
  }

}
