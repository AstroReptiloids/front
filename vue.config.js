module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/front/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
