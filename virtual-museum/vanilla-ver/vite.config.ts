import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [glsl(), tsconfigPaths()]
})
