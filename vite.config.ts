import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'pathe'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'vuetify-navigation-drawer-resize',
      fileName: 'vuetify-navigation-drawer-resize',
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue'],
  },
})
