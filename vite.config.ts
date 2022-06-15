import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnocssPlugin from '@unocss/vite';
import path from "path";

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, '/index.html'),
        'twitter-callback': path.resolve(__dirname, '/twitter-callback/index.html'),
        'instagram-callback': path.resolve(__dirname, '/instagram-callback/index.html'),
        'twitter10a-callback': path.resolve(__dirname, '/twitter10a-callback/index.html')
      }
    }
  },
});
