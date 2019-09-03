import React, { useContext, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Row, Col, notification } from 'antd'
import { useMutation } from '@apollo/react-hooks'

import { AppContext } from '../../context/AppContext'
import ProductReviewForm from './ReviewForm'
import ADD_PRODUCT_REVIEW_MUTATION from '../../../graphql/add-product-review-mutation.graphql'

/* eslint-disable react/prop-types, camelcase */
const ReviewFormRenderer = props => {
  // prettier-ignore
  const { location, match, onReviewAdded } = props

  const { t } = useTranslation()
  const reviewFormRef = useRef()
  const { isLoggedIn } = useContext(AppContext)
  const [addReview, { loading, data, error }] = useMutation(
    ADD_PRODUCT_REVIEW_MUTATION,
  )

  if (error) {
    notification.error({
      message: t('Error'),
      description: error.message,
    })
  }

  if (data) {
    onReviewAdded(data.addProductReview)
  }

  const onReviewFormSubmit = async ({ review, rating }) => {
    const product_id = Number(match.params.product_id)
    const variables = { product_id, review, rating }

    await addReview({ variables })

    reviewFormRef.current.resetFields()
  }

  if (isLoggedIn)
    return (
      <ProductReviewForm ref={reviewFormRef} onSubmit={onReviewFormSubmit} />
    )

  return (
    <Row type="flex" justify="center">
      <Col>
        <Link
          to={{
            pathname: '/login',
            // eslint-disable-next-line react/prop-types
            state: { from: location },
          }}
        >
          <Button
            loading={loading}
            size="large"
            shape="round"
            type="default"
            icon="user"
            style={{ margin: '30px 0' }}
          >
            {t('Please Sign In For Review')}
          </Button>
        </Link>
      </Col>
    </Row>
  )
}

export default withRouter(ReviewFormRenderer)

ReviewFormRenderer.propTypes = {
  onReviewAdded: PropTypes.func,
}

ReviewFormRenderer.defaultProps = {
  onReviewAdded: () => {}, // noop
}
