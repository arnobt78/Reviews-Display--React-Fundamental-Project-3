import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// The React plugin enables JSX/TSX and HMR (Fast Refresh) for React components.
export default defineConfig({
  plugins: [react()],
})
