module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@views': './src/views',
            '@utils': './src/utils',
            '@_types': './src/types',
            '@styles': './src/styles',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@components': './src/components',
            '@api': './src/api',
            '@i18n': './i18n'
          }
        }
      ]
    ]
  }
}
