import React from 'react'
import { Row, Col, Typography, List } from 'antd'
import * as PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ReviewListItem from './ReviewListItem'

const { Text, Title } = Typography

const ReviewList = props => {
  const { reviews } = props
  const { t } = useTranslation()

  const renderItem = review => <ReviewListItem review={review} />

  const template = content => (
    <Row>
      <Col md={{ span: 18, offset: 3 }}>
        <Title level={3}>Product reviews</Title>
        <br />
      </Col>
      <Col md={{ span: 18, offset: 3 }}>{content}</Col>
    </Row>
  )

  const noReviewsYet = !reviews || !reviews.length
  if (noReviewsYet)
    return template(
      <Typography style={{ textAlign: 'center', marginBottom: 32 }}>
        <Text>{t('There are no customer reviews yet')}</Text>
      </Typography>,
    )

  return template(<List dataSource={reviews} renderItem={renderItem} />)
}

export default ReviewList

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      review_id: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      created_on: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        customer_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    }),
  ),
}

ReviewList.defaultProps = {
  reviews: [],
}
