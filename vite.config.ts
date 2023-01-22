import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import elm from 'vite-plugin-elm'
import path from 'path'

export default defineConfig({
  plugins: [
    elm(),
    electron([
      {
        entry: 'electron/main.ts',
        vite: {
          resolve: {
            alias: {
              '@shared': path.resolve(__dirname, 'shared'),
              '@': path.resolve(__dirname, 'electron'),
            },
          },
          build: {
            outDir: 'dist-electron',
          },
        },
      },
      {
        entry: 'electron/preload.ts',
        onstart: (options) => options.reload(),
        vite: {
          resolve: {
            alias: {
              '@shared': path.resolve(__dirname, 'shared'),
              '@': path.resolve(__dirname, 'src'),
            },
          },
          build: {
            outDir: 'dist-electron',
          },
        },
      },
    ]),
  ],
})
