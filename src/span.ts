
import { formatCSSProperty } from './utils'


// --------------------------------------------------------------------

export default class Span {

  readonly children: Array<Object> = []

  readonly styles: Map<string, any> = new Map()

  constructor(readonly parent: Span | null = null) {
    if (parent) {
      parent.add(this)
    }
  }

  setStyles (props: Object): Span {
    for (const prop in props) {
      this.styles.set(prop, props[prop])
    }

    return this
  }

  get isRoot (): boolean {
    return this.parent === null
  }

  get length (): number {
    return this.children.length
  }

  add (item: Object): Span {
    this.children.push(item)
    return this
  }

  getStyleString (): string {
    return [...this.styles.entries()]
      .map(([key, value]) => formatCSSProperty(key, value))
      .join(' ')
  }

}
