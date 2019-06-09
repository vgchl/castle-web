import { Observable, Scene } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import { PlaceTileIndicatorView, TileView } from '.'

/**
 * Renders the game world, existing of the placed tiles, and -if applicable- tile placement indicators.
 */
export default class WorldView {

  private readonly tileViews: Map<string, TileView> = new Map()
  private readonly placeTileIndicatorViews: Map<string, PlaceTileIndicatorView> = new Map()

  constructor (
    private readonly scene: Scene,
    private readonly observableGame: Observable<castle.Game>
  ) {}

  /**
   * Render the state of the game.
   *
   * @param game The game state
   */
  public render (
    game: castle.Game
  ) {
    this.renderTiles(game)
    this.renderPlaceTileIndicators(game)
  }

  /**
   * Render the tiles placed in the world.
   *
   * @param game The game state
   */
  private renderTiles (
    game: castle.Game
  ) {
    game.world.tiles.forEach(placedTile => {
      this.getTileView(placedTile!).render()
    })

    this.tileViews.forEach((tileView, key) => {
      if (!game.world.tiles.has(tileView.position)) {
        tileView.dispose()
        this.tileViews.delete(key)
      }
    })
  }

  /**
   * Renders tile placement indicators for the positions in which tiles can be placed, if the tile
   * placement action is available.
   *
   * @param game The game state
   */
  private renderPlaceTileIndicators (
    game: castle.Game
  ) {
    const possibleTilePlacements = game.actions
      .filter(action => action instanceof castle.PlaceTileAction)
      .map(action => action as castle.PlaceTileAction)
      .map(action => action!.possibleTilePlacements)
      .first() || immutable.Map()

    possibleTilePlacements.forEach((orientations, position) => {
      this.getPlaceTileIndicatorView(position!).render(game)
    })

    this.placeTileIndicatorViews.forEach(placeTileIndicator => {
      if (!possibleTilePlacements.has(placeTileIndicator.position)) {
        placeTileIndicator.remove()
        this.placeTileIndicatorViews.delete(placeTileIndicator.position.toString())
      }
    })
  }

  /**
   * Gets the existing TileView, or a fresh one.
   *
   * @param placedTile The placed tile for which to create a view.
   * @returns a TileView
   */
  private getTileView (
    placedTile: castle.PlacedTile
  ): TileView {
    const position = placedTile.position
    if (this.tileViews.has(position.toString())) {
      return this.tileViews.get(position.toString())!
    }
    const tileView = TileView.create(placedTile.tile, this.scene, placedTile.position, placedTile.orientation)
    this.tileViews.set(position.toString(), tileView)
    return tileView
  }

  /**
   * Gets the existing PlaceTileIndicatorView, or a fresh one.
   *
   * @param position The world position at which a tile can be placed
   * @returns a PlaceTileIndicatorView
   */
  private getPlaceTileIndicatorView (
    position: castle.Position
  ): PlaceTileIndicatorView {
    if (this.placeTileIndicatorViews.has(position.toString())) {
      return this.placeTileIndicatorViews.get(position.toString())!
    }
    const placeTileIndicator = new PlaceTileIndicatorView(position, this.observableGame, this.scene)
    this.placeTileIndicatorViews.set(position.toString(), placeTileIndicator)
    return placeTileIndicator
  }

}
