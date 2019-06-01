import { AbstractMesh, ActionManager, ExecuteCodeAction, MeshBuilder, Observable, Scene, Vector3 } from 'babylonjs'
import * as castle from 'castle-game'

export default class PlaceTileIndicator {

  public readonly mesh: AbstractMesh

  public constructor (
    public readonly position: castle.Position,
    private readonly observableGame: Observable<castle.Game>,
    private readonly scene: Scene
  ) {
    this.mesh = MeshBuilder.CreateBox('PlaceTileIndicator', { height: 0.2, width: 1.5, depth: 1.5 }, this.scene)
    this.mesh.position = new Vector3(this.position.x * 3, 0, this.position.y * 3)
  }

  public render (game: castle.Game): void {
    const orientation = game.actions
      .filter(action => action instanceof castle.PlaceTileAction)
      .map(action => action as castle.PlaceTileAction)
      .map(action => action!.possibleTilePlacements.get(this.position).first())
      .first()

    this.mesh.actionManager = new ActionManager(this.scene)
    this.mesh.actionManager.registerAction(new ExecuteCodeAction(
      { trigger: ActionManager.OnPickTrigger },
      () => {
        let newGame = game.actions
          .filter(action => action instanceof castle.PlaceTileAction)
          .map(action => action as castle.PlaceTileAction)
          .map(action => action!.placeTile(this.position, orientation))
          .first()

        this.observableGame.notifyObservers(newGame)
      }
    ))
  }

  remove (): any {
    this.mesh.dispose()
  }

}
