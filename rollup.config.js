import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      { file: "dist/bundle.cjs.js", format: "cjs" },
    ],
    plugins: [commonjs(), babel(),terser()],
  },
];
