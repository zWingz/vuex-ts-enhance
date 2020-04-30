module.exports = {
  entry: './dev/index',
  output: {
      dir: 'docs'
  },
  plugins: [],
  configureWebpack: {
      resolve: {
          extensions: ['.vue']
      }
  }
}
