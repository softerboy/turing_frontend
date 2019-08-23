/* eslint-disable
  import/prefer-default-export,
  no-restricted-globals,
  no-param-reassign,
  camelcase
*/
import qs from 'query-string'

const arrayFormat = 'comma'

const isNumber = param => !isNaN(param)
const toNumber = param => Number(param)

const toNumberArray = param => {
  // eslint-disable-next-line no-restricted-globals
  if (typeof param === 'string' && !isNaN(param)) {
    return [Number(param)]
  }

  if (Array.isArray(param)) {
    return param.filter(isNumber).map(toNumber)
  }

  return []
}

export const queryStringToDefaultValues = queryString => {
  if (!queryString) return {}

  const { categories, colors, sizes, price } = qs.parse(queryString, {
    arrayFormat,
  })

  return {
    defaultCategoryIds: toNumberArray(categories),
    defaultColorIds: toNumberArray(colors),
    defaultSizeIds: toNumberArray(sizes),
    defaultPrice: toNumberArray(price).sort(),
  }
}

export const filterToQueryString = filterOptions => {
  const result = {}
  const { categories, colors, sizes, price } = filterOptions

  if (categories && categories.length) {
    result.categories = categories.map(({ category_id }) => category_id)
  }

  if (colors && colors.length) {
    result.colors = colors.map(({ color_id }) => color_id)
  }

  if (sizes && sizes.length) {
    result.sizes = sizes.map(({ size_id }) => size_id)
  }

  result.price = price
  return qs.stringify(result, { arrayFormat })
}
