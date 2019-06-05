import { Mesh, Scene, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import * as tileViews from '.'

export default abstract class Tile {

  public static readonly width = 3

  public mesh?: Mesh

  protected constructor (
    protected readonly scene: Scene,
    public readonly position: castle.Position = castle.Position.origin,
    public readonly orientation: castle.Direction = castle.Direction.north
  ) {}

  public static create (
    tile: castle.Tile,
    scene: Scene,
    position: castle.Position = castle.Position.origin,
    orientation: castle.Direction = castle.Direction.north
  ): Tile {
    if (tile instanceof castle.TileD) {
      return new tileViews.TileD(scene, position, orientation)
    }
    if (tile instanceof castle.TileV) {
      return new tileViews.TileV(scene, position, orientation)
    }
    throw new Error('Unsupported tile type.')
  }

  public render (
    figures: immutable.Map<string, castle.Figure> = immutable.Map(),
    figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>> = immutable.Map()
  ) {
    this.renderTile()
    this.renderFigures(figures)
    this.renderFigurePlaceholders(figurePlaceholders)

    if (this.mesh) {
      this.mesh.position = new Vector3(this.position.x * Tile.width, 0, this.position.y * Tile.width)
      this.mesh.rotation.y = this.orientation.radians
    }
  }

  protected abstract renderTile (): void

  protected abstract renderFigures (figures: immutable.Map<string, castle.Figure>): void

  protected abstract renderFigurePlaceholders (figurePlaceholders: immutable.Map<string, immutable.List<castle.Figure>>): void

  public dispose () {
    if (!this.mesh) {
      return
    }
    this.mesh.dispose()
  }

}
