import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },  
  server: {
    proxy: {
      "/api": { // <- Cualquier ruta que empiece con "/api"
        target: "https://func-autocalldev.azurewebsites.net", // <- Base URL del backend
        changeOrigin: true,
      },
      "/auth":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "/api/Auth")
      },
      "/token":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/token/, "/api/token")
      },
      "/validToken":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/validToken/, "/api/validToken")
      },
      "/get":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get/, "/api/get")
      },
      "/delete":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delete/, "/api/delete")
      },
      "/registro":{
        target: "https://func-autocalldev.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/registro/, "/api/registro")
      }
    },
  },
})
