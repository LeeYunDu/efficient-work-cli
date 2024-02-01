import { defineConfig, BuildOptions } from 'vite'
import * as path from 'path'

export default () => {
  return defineConfig({
    base: './',
    server: {
      port: 1024,
      host: true,
    },

    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: 'static', replacement: path.resolve(__dirname, 'public/static') }
      ]
    },
  })
}