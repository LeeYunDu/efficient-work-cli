import { defineConfig, BuildOptions } from 'vite'
import * as path from 'path'
export default () => {
  return defineConfig({
    base: './',
    server: {
      port: 1024,
      host: true,
      proxy: Object.assign({}, {
        // api proxy
        '/zhaoshang-project-api': {
          target: 'http://172.16.208.12:18550',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(new RegExp(`^/api`), '/api')
        },
        '/node-szzt': {
          target: 'http://172.16.208.13:4001',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(new RegExp(`^/node-szzt`), '/api')
        },
      })
    },

    components: [
      'vue-prism-editor',
    ],
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: 'static', replacement: path.resolve(__dirname, 'public/static') }
      ]
    },
  })
}