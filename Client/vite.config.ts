// https://vitejs.dev/config/

import react from '@vitejs/plugin-react';
import { ConfigEnv, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }: ConfigEnv) => {
  require('dotenv').config({ path: `./.env.${mode}` });
  return {
    build: {
      sourcemap: true,
    },
    plugins: [react(), tsconfigPaths()],
    server: {
      host: true,
      open: false,
    },
  };
});
