import { AbstractMesh, ActionManager, ExecuteCodeAction, MeshBuilder, Scene, Vector3, StandardMaterial, Color3 } from 'babylonjs'
import * as castle from 'castle-game'
import * as ui from '../ui'

export default class TilePlaceholderView {

  public readonly mesh: AbstractMesh

  public constructor (
    private readonly scene: Scene,
    private readonly dispatch: ui.Dispatch,
    public readonly position: castle.Position
  ) {
    this.mesh = MeshBuilder.CreateBox('PlaceTileIndicator', { height: 0.3, width: 1.5, depth: 1.5 }, scene)
    this.mesh.position = new Vector3(position.x * 3, 0, position.y * 3)
    const material = new StandardMaterial('mat', this.scene)
    material.diffuseColor = Color3.FromInts(255, 255, 255)
    material.specularColor = new Color3(0.1, 0.1, 0.1)
    this.mesh.material = material
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
      () => this.dispatch(new ui.actions.PlaceTileUIAction(this.position, orientation))
    ))
  }

  remove (): any {
    this.mesh.dispose()
  }

}
