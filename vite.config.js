import { defineConfig } from 'vite'
import path from 'path'
import mpa from 'vite-plugin-mpa'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    mpa.default({
      scanDir: "src/pages"
    }),
  ],
  build: {
    
  }
})