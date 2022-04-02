module.exports = {
  // // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    'autoprefixer': {
      // 配置要兼容到的环境信息
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // *表示所有
      propList: ['*'],
      // 排除不要转换的样式资源
      exclude:'github-markdown'
    }
  }
}