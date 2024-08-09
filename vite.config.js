import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'

export default defineConfig({
  base: '/',
  build: {
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      // 配置多页面
      input: {
        index: './index.html',
        detail: './detail.html',
        // welcome: './welcome.html',
        // result: './result.html',
        // privacy: './privacy.html',
        // terms: './terms.html',
        // dmca: './dmca.html',
        // cookiepolicy: './cookiepolicy.html',
        // contact: './contact.html',
      }
    }
  },
  optimizedeps: {
    esbuildoptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: '@/assets',
      utils: '@/utils',
      api: '@/api'
    }
  },
  plugins: [vue(),
  createHtmlPlugin({
    transform({ code, path }) {
      if (path.endsWith('.html')) {
        // 正则匹配 HTML 中的 link 标签引入的 LESS 文件
        const regex = /<link rel="stylesheet\/less" href="(.+\.less)">/g;
        code = code.replace(regex, async (match, filePath) => {
          // 读取 LESS 文件内容
          const lessContent = fs.readFileSync(path.replace(/\/[^/]*$/, `/${filePath}`), 'utf-8');
          // 编译 LESS 文件为 CSS
          const output = await less.render(lessContent);
          // 返回编译后的 CSS
          return `<style>${output.css}</style>`;
        });
      }
      return code;
    }
  })],
  // Vite自身已经集成PostCSS，无需再次安装。另外也无需单独创建PostCSS配置文件，已集成到vite.config.js的css选项中
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    }
  },
  // server: {
  //   proxy: {
  //     '/v1': {
  //       target: 'http://localhost:8001'
  //     }
  //   }
  // },
  server: {
    proxy: {
      '/v1': {
        target: 'https://app.concrdeng.com',
        changeOrigin: false, // 设置同源 默认false，是否需要改变原始主机头为目标URL, 如果接口跨域，需要进行这个参数配置
        ws: true, // 是否代理websockets
        pathRewrite: {
          // 路径重置
          '^/v1': ''
        }
      }
    }
  }
})
