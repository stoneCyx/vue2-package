import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path';

export default {
  plugins: [createVuePlugin()],
  base: "./",//打包路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}