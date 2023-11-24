import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
