import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const outFileName = "avvhafas-cards.mjs";

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    // use index.html in dev only
    root: isDev ? '.' : undefined,

    build: {
      // use library mode
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: () => outFileName,
      },

      rollupOptions: {
        output: {
          // force a single file
          inlineDynamicImports: true,
          manualChunks: undefined,
        },
      },

      sourcemap: 'inline',
      minify: !isDev,

      // Avoid warnings when bundling Lit
      chunkSizeWarningLimit: undefined,
    },

    // Dev quality-of-life
    server: {
      open: true,
    },
  };
});
