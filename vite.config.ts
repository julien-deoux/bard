import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import elm from 'vite-plugin-elm'

export default defineConfig({
  plugins: [
    elm(),
    electron({
      entry: 'electron/main.ts',
      vite: {
        build: {
          outDir: 'dist-electron',
        },
      },
    }),
  ],
})
