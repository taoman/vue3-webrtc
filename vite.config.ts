import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from '@samrum/vite-plugin-web-extension';
import {mainfest} from './src/manifest'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),webExtension({
    manifest:{
      ...mainfest
    }
  })],
})
