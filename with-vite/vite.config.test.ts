import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteTestPlugin from 'vite-plugin-test'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteTestPlugin()],
  define: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
});
