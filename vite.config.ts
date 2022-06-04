import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        callback: path.resolve(__dirname, 'callback/index.html')
      }
    }
  },
});
