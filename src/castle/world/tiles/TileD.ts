import { Color3, MeshBuilder, StandardMaterial, Vector3, Scene } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import { Tile } from '.'

export default class TileD extends Tile {

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

  protected renderFigures (figures: immutable.Map<string, castle.Figure>) {
    // TODO
  }

  protected renderFigurePlaceholders (figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>>) {
    // TODO
  }

}
