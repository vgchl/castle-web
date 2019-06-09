import { Color3, MeshBuilder, StandardMaterial, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import { TileView } from '../tiles'
import * as immutable from 'immutable'

export default class TileVView extends TileView {

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

    const roadA = MeshBuilder.CreateGround('roadA', { width: 0.5, height: 1.75 }, this.scene)
    roadA.parent = this.mesh
    roadA.position = new Vector3(0, 0.251, -0.625)
    const roadMaterial = new StandardMaterial('mat', this.scene)
    roadMaterial.diffuseColor = Color3.FromInts(217, 210, 191)
    roadMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    roadA.material = roadMaterial

    const roadB = MeshBuilder.CreateGround('roadB', { width: 1.75, height: 0.5 }, this.scene)
    roadB.parent = this.mesh
    roadB.position = new Vector3(-0.625, 0.251, -0)
    roadB.material = roadMaterial
  }

  protected renderFigures (
    figures: immutable.Map<string, castle.Figure>
  ) {
    // TODO
  }

  protected renderFigurePlaceholders (
    figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>>
  ) {
    // TODO
  }

}
