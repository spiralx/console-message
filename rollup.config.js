import r_typescript from 'rollup-plugin-typescript'
import typescript from 'typescript'

// --------------------------------------------------------------------

export default {
  entry:  'src/index.ts',
  dest: 'dist/console.message.js',
  format: 'umd',
  moduleName:   'ConsoleMessage',
  sourceMap: true,
  plugins: [
    r_typescript({ typescript })
  ]
}
