// eslint-disable-next-line
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const themeVars = require('./src/theme/variables')

const addGraphqlLoader = () => config => {
  const { rules } = config.module
  const foundRule = rules.find(rule => rule.oneOf && Array.isArray(rule.oneOf))

  foundRule.oneOf.unshift({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  })
  return config
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVars,
  }),
  addGraphqlLoader(),
)
