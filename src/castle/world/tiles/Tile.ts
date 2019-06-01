import { Mesh, Scene, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import { TileD } from '.'

export default abstract class Tile {

  public mesh?: Mesh

  public constructor (
    protected readonly scene: Scene
  ) {
    //
  }

  public static create (
    placedTile: castle.PlacedTile,
    scene: Scene
  ): Tile {
    if (placedTile.tile instanceof castle.TileD) {
      return new TileD(scene)
    }
    if (placedTile.tile instanceof castle.TileV) {
      return new TileD(scene)
    }
    throw new Error('Unsupported tile type.')
  }

  public render (
    placedTile: castle.PlacedTile,
    figures: immutable.Map<string, castle.Figure>,
    figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>>
  ) {
    this.renderTile(placedTile.tile)
    this.renderFigures(figures)
    this.renderFigurePlaceholders(figurePlaceholders)

    if (this.mesh) {
      this.mesh.position = new Vector3(placedTile.position.x * 3, 0, placedTile.position.y * 3)
      this.mesh.rotation.y = placedTile.orientation.radians
    }
  }

  protected abstract renderTile (tile: castle.Tile): void

  protected abstract renderFigures (figures: immutable.Map<string, castle.Figure>): void

  protected abstract renderFigurePlaceholders (figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>>): void

  public dispose () {
    if (!this.mesh) {
      return
    }
    this.mesh.dispose()
  }

}
