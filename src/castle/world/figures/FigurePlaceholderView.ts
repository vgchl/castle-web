import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3, ActionManager, ExecuteCodeAction } from 'babylonjs'
import * as castle from 'castle-game'
import * as ui from '../../ui'

export default class FigurePlaceholderView {

  public mesh?: Mesh

  constructor (
    private readonly scene: Scene,
    public readonly dispatch: ui.Dispatch,
    public readonly placedFigure: castle.PlacedFigure
  ) {}

  render () {
    if (!this.mesh) {
      this.mesh = MeshBuilder.CreateBox('tile', { height: 1, width: 0.3, depth: 0.3 }, this.scene)
      const material = new StandardMaterial('mat', this.scene)
      material.alpha = 0.85
      material.diffuseColor = Color3.FromInts(255, 255, 255)
      material.specularColor = new Color3(0.1, 0.1, 0.1)
      this.mesh.material = material
    }

    this.mesh.actionManager = new ActionManager(this.scene)
    this.mesh.actionManager.registerAction(new ExecuteCodeAction(
      { trigger: ActionManager.OnPickTrigger },
      () => this.dispatch(new ui.actions.PlaceFigureUIAction(this.placedFigure))
    ))
  }

  public delete () {
    if (this.mesh) {
      this.mesh.dispose()
    }
  }

}
