const path = require('path');
var pxtorem = require('postcss-pxtorem');
const svgSpriteDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets'),  // 业务代码本地私有 svg 存放目录
];
export default {
  entry: "src/index.js",
  disableCSSModules: true,
  publicPath: "./",
  less: true,
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", 'libraryDirectory': 'lib', "style": true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
      "proxy":{
        "/api":{
		      "target":"http://localhost:10001",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      }
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", 'libraryDirectory': 'lib', "style": true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ]
    }
  },

  autoprefixer: {
    "browsers": [
      "iOS >= 8", "Android >= 4"
    ]
  },
  svgSpriteLoaderDirs: svgSpriteDirs,

}
