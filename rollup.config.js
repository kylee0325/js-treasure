import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts', // 打包入口
    output: [
      {
        file: pkg.main,
        format: 'commonjs'
      },
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: './dist/index.min.js',
        format: 'iife',
        name: 'JsCode',
        exports: 'named',
        extend: true
        // globals: {
        //   vue: "Vue",
        //   "vue-demi": "VueDemi",
        // },
      }
    ],
    plugins: [
      // 打包插件
      resolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript(), // 解析TypeScript
      terser()
    ]
    // external: ["vue", "vue-demi"],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'es'
    },
    plugins: [dts()]
  }
]
