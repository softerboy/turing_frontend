/* eslint-disable
  import/prefer-default-export,
  no-restricted-globals,
  no-param-reassign,
  camelcase
*/
import qs from 'query-string'

import { CART_ID_KEY } from './constants'
import GENERATE_CART_ID_QUERY from '../graphql/cart-id-query.graphql'

const arrayFormat = 'comma'
const parseNumbers = true

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

export const filterPropsFromQueryString = queryString => {
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

export const filterToQueryString = (filterOptions, currentQueryString) => {
  const result = qs.parse(currentQueryString, { arrayFormat })
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

export const paginationPropsFromQueryString = queryString => {
  const result = { page: 1, per_page: 10, sort: undefined }
  if (!queryString) return result

  const { page, per_page, sort = '' } = qs.parse(queryString, { parseNumbers })
  if (!isNaN(page)) result.page = page
  if (!isNaN(per_page)) result.per_page = per_page
  if (['name', 'category', 'price'].includes(sort.toLowerCase())) {
    result.sort = sort.toLowerCase()
  }

  return result
}

export const mergePaginationParamsToQueryString = (
  paginationParams,
  currentQueryString,
) => {
  const actualParams = qs.parse(currentQueryString, { arrayFormat })

  const { current: page, pageSize: per_page, sort } = paginationParams

  const result = {
    ...actualParams,
    page,
    per_page,
    sort,
  }

  return qs.stringify(result, { arrayFormat })
}

export const getPriceIncludingDiscounted = ({ discounted_price, price }) =>
  discounted_price > 0.0 ? discounted_price : price

export const getCartId = async client => {
  // check cart id exists in localStorage
  const cartId = window.localStorage.getItem(CART_ID_KEY)
  if (cartId && cartId.length) return cartId

  // prettier-ignore
  // eslint-disable-next-line react/prop-types
  const { data: { cart_id } } = await client.query({ query: GENERATE_CART_ID_QUERY })
  // save cartId for future use
  window.localStorage.setItem(CART_ID_KEY, cart_id)
  return cart_id
}
