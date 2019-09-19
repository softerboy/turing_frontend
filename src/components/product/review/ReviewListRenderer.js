import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Button, Col, Row } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import ReviewList from './ReviewList'
import PRODUCT_REVIEW_QUERY from '../../../graphql/product-review-query.graphql'
import ReviewListPlaceholder from './ReviewListPlaceholder'

const LOADING = 1
const FETCH_MORE = 3

/* eslint-disable react/prop-types, camelcase */
const ReviewListRenderer = (props, ref) => {
  const { product_id } = props
  const { t } = useTranslation()
  const [reviews, setReviews] = useState([])

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

  useImperativeHandle(ref, () => ({
    pushReview: review => setReviews([review, ...reviews]),
  }))

  useEffect(() => {
    if (data && data.product) {
      setReviews(data.product.reviews.data)
    }
  }, [data])

  if (networkStatus === LOADING) {
    return (
      <Row>
        <Col md={{ span: 18, offset: 3 }}>
          <ReviewListPlaceholder />
        </Col>
      </Row>
    )
  }

  if (error) return <div>Ops ;-)</div>

  // eslint-disable-next-line camelcase
  const { next_cursor } = data.product.reviews

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
              data: [...reviews, ...result],
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

export default forwardRef(ReviewListRenderer)
