
import Span from './span'

// --------------------------------------------------------------------

export default class OutputChainer {

  readonly root: Span = new Span()

  current: Span | null = null

  constructor() {
    this.current = this.root
  }

  public text (s: string, styles: Object = {}) {
    const newSpan = new Span(this.current)
    newSpan
      .setStyles(styles)
      .add({
        type: 'text',
        value: s
      })

  }

  group (collapsed: boolean = false) {
    this.current.add({
      type: 'group',
      options: {
        collapsed
      }
    })
  }
}
