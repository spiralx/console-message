
import { formatCSSProperty } from './utils'


// --------------------------------------------------------------------

interface IOutputStep {
  parent: IContainerStep | null
  execute (): void
}

interface IContainerStep extends IOutputStep {
  children: IOutputStep[]
  readonly length: number
  add (step: IOutputStep): IContainerStep
}

// --------------------------------------------------------------------

export class Span implements IContainerStep {

  readonly children: IOutputStep[] = []

  readonly styles: Map<string, any> = new Map()

  constructor (readonly parent: IContainerStep | null = null) {
    if (parent) {
      parent.add(this)
    }
  }
  get length (): number {
    return this.children.length
  }

  add (step: IOutputStep): IContainerStep {
    this.children.push(item)
    return this
  }

  execute (): void {
    for (const step of this.children) {
      step.execute()
    }
  }

  setStyles (props: Object): IContainerStep {
    for (const prop in props) {
      this.styles.set(prop, props[prop])
    }

    return this
  }

  get isRoot (): boolean {
    return this.parent === null
  }

  getStyleString (): string {
    return [...this.styles.entries()]
      .map(([key, value]) => formatCSSProperty(key, value))
      .join(' ')
  }

}
