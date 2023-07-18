import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import unocss from "unocss/vite";

export default defineConfig({
  plugins: [unocss({ configFile: "./uno.config.ts" }), sveltekit()],
});
