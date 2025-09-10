import { defineConfig } from "vite";

export default defineConfig({
    esbuild: {
        jsxFactory: "MyReact.createElement", // 「jsxがあれば自動的にこの関数で変換してね」という設定
    }
});
