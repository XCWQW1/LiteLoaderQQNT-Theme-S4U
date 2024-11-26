import { defineConfig } from 'electron-vite'
import { resolve } from 'path'
import { defineConfig as defineViteConfig } from 'vite'

export default defineConfig({
  main: {
    build: {
      minify: true,
      outDir: resolve(__dirname, './dist', 'main'),
      lib: {
        entry: resolve(__dirname, './src', `./main/index.js`),
        formats: ['cjs'],
      },
    },
  },
  preload: {
    build: {
      minify: true,
      outDir: resolve(__dirname, './dist', 'preload'),
      lib: {
        entry: resolve(__dirname, './src', `./preload/index.js`),
        formats: ['cjs'],
      },
    },
  },
  renderer: defineViteConfig({
    build: {
      minify: true,
      outDir: resolve(__dirname, './dist', 'renderer'),
      lib: {
        entry: resolve(__dirname, './src', './renderer/index.js'),
        fileName: () => 'index.js',
        formats: ['es'],
      },
      rollupOptions: {
        input: resolve(__dirname, './src', './renderer/index.js'),
      },
    },
  }),
})
