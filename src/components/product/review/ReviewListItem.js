import React from 'react'
import { Col, Rate, Row, Typography } from 'antd'
import moment from 'moment'
import * as PropTypes from 'prop-types'

const { Title, Text, Paragraph } = Typography

const ReviewListItem = props => {
  const { review } = props

  return (
    <Row type="flex" style={{ marginBottom: 40 }}>
      <Col md={{ span: 6, order: 1 }} xs={{ order: 2 }}>
        <Rate value={review.rating} disabled />
        <Title />
        <Text strong>{review.owner.name}</Text>
        <div style={{ clear: 'both' }} />
        <Text>{moment.unix(Number(review.created_on) / 1000).fromNow()}</Text>
      </Col>
      <Col md={{ span: 18, order: 2 }} xs={{ order: 1 }}>
        <Paragraph>{review.review}</Paragraph>
      </Col>
    </Row>
  )
}

export default ReviewListItem

ReviewListItem.propTypes = {
  review: PropTypes.shape({
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
}

ReviewListItem.defaultProps = {
  review: null,
}
