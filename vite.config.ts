import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // 引入 path 模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 关键代码：将 '@' 映射到 'src' 目录
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
