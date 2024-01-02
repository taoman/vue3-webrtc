import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension from "@samrum/vite-plugin-web-extension";
import { mainfest } from "./src/manifest";
import mkcert from "vite-plugin-mkcert";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    host:'0.0.0.0'
  },
  plugins: [
    vue(),
    mkcert(),
    // webExtension({
    //   manifest: {
    //     ...mainfest,
    //   },
    // }),
  ],
});
