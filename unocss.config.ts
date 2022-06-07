import { defineConfig } from "@unocss/vite";
import { presetUno, presetTypography } from "unocss";

export default defineConfig({
  presets: [presetUno(),
           presetTypography()],
});
