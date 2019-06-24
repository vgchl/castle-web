import { Mesh, Scene, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import { TileDView, TileVView } from '../tiles'
import { FigurePlaceholderView } from '../figures'
import FigureView from '../figures/FigureView'
import * as ui from '../../ui'

export default abstract class TileView {

  public static readonly width = 3

  public mesh?: Mesh

  private figureViews: Map<string, FigureView> = new Map()
  private figurePlaceholderViews: Map<string, FigurePlaceholderView> = new Map()

  protected abstract figurePositionsBySegmentId: Map<string, Vector3>

  protected constructor (
    protected readonly scene: Scene,
    protected readonly dispatch: ui.Dispatch,
    public readonly tile: castle.Tile,
    public readonly position: castle.Position = castle.Position.origin,
    public readonly orientation: castle.Direction = castle.Direction.north
  ) {}

  public static create (
    scene: Scene,
    dispatch: ui.Dispatch,
    tile: castle.Tile,
    position: castle.Position = castle.Position.origin,
    orientation: castle.Direction = castle.Direction.north
  ): TileView {
    if (tile instanceof castle.TileD) {
      return new TileDView(scene, dispatch, tile, position, orientation)
    }
    if (tile instanceof castle.TileV) {
      return new TileVView(scene, dispatch, tile, position, orientation)
    }
    throw new Error('Unsupported tile type.')
  }

  public render (
    figures: immutable.List<castle.PlacedFigure> = immutable.List(),
    figurePlaceholders: immutable.List<castle.PlacedFigure> = immutable.List()
  ) {
    this.renderTile()
    this.renderFigures(figures)
    this.renderFigurePlaceholders(figurePlaceholders)

    if (this.mesh) {
      this.mesh.position = new Vector3(this.position.x * TileView.width, 0, this.position.y * TileView.width)
      this.mesh.rotation.y = this.orientation.radians
    }
  }

  protected abstract renderTile (): void

  protected renderFigures (
    figures: immutable.List<castle.PlacedFigure>
  ): void {
    figures.forEach(placedFigure => {
      const segmentId = placedFigure!.placedSegment!.segment.id
      if (!this.figureViews.has(segmentId)) {
        const figureView = FigureView.create(placedFigure!.figure, this.scene)
        figureView.render()
        figureView.mesh!.position = this.figurePositionsBySegmentId.get(segmentId)!
        figureView.mesh!.parent = this.mesh!

        this.figureViews.set(segmentId, figureView)
      }
    })

    this.figureViews.forEach((figureView, segmentId) => {
      if (!figures.find(figure => figure!.placedSegment!.segment.id === segmentId)) {
        figureView.delete()
        this.figureViews.delete(segmentId)
      }
    })
  }

  protected renderFigurePlaceholders (
    figurePlaceholders: immutable.List<castle.PlacedFigure>
  ) {
    figurePlaceholders.forEach(placedFigure => {
      const segmentId = placedFigure!.placedSegment!.segment.id
      if (!this.figurePlaceholderViews.has(segmentId)) {
        const figurePlaceholderView = new FigurePlaceholderView(this.scene, this.dispatch, placedFigure!)
        figurePlaceholderView.render()
        figurePlaceholderView.mesh!.position = this.figurePositionsBySegmentId.get(segmentId)!
        figurePlaceholderView.mesh!.parent = this.mesh!

        this.figurePlaceholderViews.set(segmentId, figurePlaceholderView)
      }
    })

    this.figurePlaceholderViews.forEach((figurePlaceholderView, segmentId) => {
      if (!figurePlaceholders.find(figurePlaceholder => figurePlaceholder!.placedSegment!.segment.id === segmentId)) {
        figurePlaceholderView.delete()
        this.figurePlaceholderViews.delete(segmentId)
      }
    })
  }

  public dispose () {
    if (!this.mesh) {
      return
    }
    this.mesh.dispose()
  }

}
