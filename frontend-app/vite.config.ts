import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devApiProxyTarget = env.VITE_DEV_API_PROXY_TARGET

  return {
    plugins: [react()],
    server: devApiProxyTarget
      ? {
          proxy: {
            '/api': {
              target: devApiProxyTarget,
              changeOrigin: true,
            },
            '/docs': {
              target: devApiProxyTarget,
              changeOrigin: true,
            },
            '/api-docs.json': {
              target: devApiProxyTarget,
              changeOrigin: true,
            },
          },
        }
      : undefined,
  }
})
