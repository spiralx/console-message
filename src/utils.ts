import { CSS_NUMERIC_PROPERTIES } from './consts'


// --------------------------------------------------------------------

export function apply<T> (dest: T, src: Object): T {
  for (const key in src) {
    if (!dest.hasOwnProperty(key)) {
      (dest as any)[key] = src[key]
    }
  }
  return dest
}

// --------------------------------------------------------------------

export function toCamelCase (str: string): string {
  return str.replace(/-\w/g, m => m[1].toUpperCase())
}

export function toDashCase (str: string): string {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}


// --------------------------------------------------------------------

export function formatCSSProperty (prop: string, value: string | number): string {
  if (typeof value === 'number') {
    if (!CSS_NUMERIC_PROPERTIES.has(prop)) {
      value = value + 'px'
    }
  }

  return `${prop}: ${value};`
}
