import { createVuePlugin } from 'vite-plugin-vue2';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default {
  plugins: [createVuePlugin(), vueJsx()],
  base: './', // 打包路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
