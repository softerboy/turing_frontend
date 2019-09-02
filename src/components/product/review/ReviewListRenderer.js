import React from 'react'
import { Button } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import ReviewList from './ReviewList'
import PRODUCT_REVIEW_QUERY from '../../../graphql/product-review-query.graphql'

const LOADING = 1
const FETCH_MORE = 3

/* eslint-disable react/prop-types, camelcase */
const ReviewListRenderer = ({ product_id }) => {
  const { t } = useTranslation()
  const { data, error, fetchMore, networkStatus } = useQuery(
    PRODUCT_REVIEW_QUERY,
    {
      variables: {
        product_id,
        cursor: null,
        count: 2,
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: false,
    },
  )

  if (networkStatus === LOADING) return <div>Loading...</div>

  if (error) return <div>Ops ;-)</div>

  // eslint-disable-next-line camelcase
  const { data: reviews, next_cursor } = data.product.reviews

  const onFetchMoreClick = async () => {
    await fetchMore({
      variables: { cursor: next_cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const {
          data: result,
          next_cursor: new_cursor,
        } = fetchMoreResult.product.reviews

        // merge results
        return {
          ...prev,
          product: {
            ...prev.product,
            reviews: {
              ...prev.product.reviews,
              data: [...prev.product.reviews.data, ...result],
              next_cursor: new_cursor,
            },
          },
        }
      },
    })
  }

  return (
    <div>
      <ReviewList reviews={reviews} />
      {next_cursor && (
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Button
            size="large"
            loading={networkStatus === FETCH_MORE}
            onClick={onFetchMoreClick}
          >
            {t('Fetch more reviews')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default withRouter(ReviewListRenderer)
