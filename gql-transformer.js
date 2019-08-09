// eslint-disable-next-line
const gql = require('graphql-tag')

module.exports = {
  process(src) {
    const str = JSON.stringify(gql(src))
    return `module.exports=${str};module.exports.default=module.exports;`
  },
}
