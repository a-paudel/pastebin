import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  presets: [presetMini()],
  blocklist: [/^m[0-9]+$/],
});
