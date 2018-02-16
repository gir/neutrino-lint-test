const { join } = require('path')

module.exports = (neutrino) => {
  neutrino.use('@neutrinojs/airbnb', {
    eslint: {
      rules: {
        semi: [2, 'never'],
      },
      settings: {
        'import/resolver': {
          node: {
            moduleDirectory: ['node_modules', 'src/', 'test/'],
          },
        },
      },
    },
  })

  neutrino.use('@neutrinojs/react')

  // Allow Webpack to resolve files from src as the base.
  neutrino.config.resolve.modules.add(join(__dirname, 'src'))
}
