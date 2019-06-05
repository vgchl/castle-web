import { Observable, Scene } from 'babylonjs'
import * as castle from 'castle-game'
import * as immutable from 'immutable'
import { PlaceTileIndicator, Tile } from '.'

export default class World {

  private readonly tiles: Map<string, Tile> = new Map()
  private readonly placeTileIndicators: Map<string, PlaceTileIndicator> = new Map()

  constructor (
    private readonly scene: Scene,
    private readonly observableGame: Observable<castle.Game>
  ) {
  }

  public render (
    game: castle.Game
  ) {
    this.renderTiles(game)
    this.renderPlaceTileIndicators(game)
  }

  private renderTiles (
    game: castle.Game
  ) {
    game.world.tiles.forEach(placedTile => {
      this.getTile(placedTile!).render()
    })

    this.removeOldTiles(game)
  }

  private renderPlaceTileIndicators (
    game: castle.Game
  ) {
    const possibleTilePlacements = game.actions
      .filter(action => action instanceof castle.PlaceTileAction)
      .map(action => action as castle.PlaceTileAction)
      .map(action => action!.possibleTilePlacements)
      .first() || immutable.Map()

    possibleTilePlacements.forEach((orientations, position) => {
      this.getPlaceTileIndicator(position!).render(game)
    })

    this.removeOldPlaceTileIndicators(possibleTilePlacements)
  }

  private getTile (
    placedTile: castle.PlacedTile
  ): Tile {
    const position = placedTile.position
    if (this.tiles.has(position.toString())) {
      return this.tiles.get(position.toString())!
    }
    const tile = Tile.create(placedTile.tile, this.scene, placedTile.position, placedTile.orientation)
    this.tiles.set(position.toString(), tile)
    return tile
  }

  private getPlaceTileIndicator (
    position: castle.Position
  ): PlaceTileIndicator {
    if (this.placeTileIndicators.has(position.toString())) {
      return this.placeTileIndicators.get(position.toString())!
    }
    const placeTileIndicator = new PlaceTileIndicator(position, this.observableGame, this.scene)
    this.placeTileIndicators.set(position.toString(), placeTileIndicator)
    return placeTileIndicator
  }

  private removeOldTiles (
    game: castle.Game
  ) {
    this.tiles.forEach((tile, key) => {
      if (!game.world.tiles.has(tile.position)) {
        tile.dispose()
        this.tiles.delete(key)
      }
    })
  }

  private removeOldPlaceTileIndicators (
    possibleTilePlacements: immutable.Map<castle.Position, immutable.List<castle.Direction>>
  ) {
    this.placeTileIndicators.forEach(placeTileIndicator => {
      if (!possibleTilePlacements.has(placeTileIndicator.position)) {
        placeTileIndicator.remove()
        this.placeTileIndicators.delete(placeTileIndicator.position.toString())
      }
    })
  }

}
