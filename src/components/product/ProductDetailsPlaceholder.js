import React from 'react'
import ContentLoader from 'react-content-loader'
import { Card, Col, Row } from 'antd'

const grid = {
  // prettier-ignore
  /* eslint-disable */
  carousel: { xs: 24, sm: 12, lg: 7 },
  details: { xs: 24, sm: 12, lg: 17 },
}

const ProductDetailsPlaceholder = () => {
  return (
    <Card>
      <Row gutter={32}>
        <Col {...grid.carousel}>
          <ContentLoader
            height={400}
            width={360}
            speed={1}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="20" y="15" rx="20" ry="20" width="300" height="320" />
            <rect x="92" y="347" rx="5" ry="5" width="45" height="45" />
            <rect x="148" y="347" rx="5" ry="5" width="45" height="45" />
            <rect x="205" y="347" rx="5" ry="5" width="45" height="45" />
          </ContentLoader>
        </Col>

        <Col {...grid.details}>
          <ContentLoader
            height={400}
            width={600}
            speed={1}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="7" y="16" rx="0" ry="0" width="448" height="14" />
            <rect x="8" y="63" rx="0" ry="0" width="229" height="24" />
            <rect x="11" y="142" rx="0" ry="0" width="196" height="9" />
            <circle cx="20" cy="190" r="12" />
            <circle cx="60" cy="190" r="12" />
            <circle cx="100" cy="190" r="12" />
            <circle cx="140" cy="190" r="12" />
            <circle cx="180" cy="190" r="12" />
            <circle cx="220" cy="190" r="12" />
            <rect x="10" y="230" rx="0" ry="0" width="100" height="20" />
            <rect x="10" y="279" rx="6" ry="6" width="80" height="32" />
            <rect x="105" y="279" rx="6" ry="6" width="80" height="32" />
            <rect x="200" y="279" rx="6" ry="6" width="80" height="32" />
            <rect x="295" y="279" rx="6" ry="6" width="80" height="32" />
            <rect x="390" y="279" rx="6" ry="6" width="80" height="32" />
          </ContentLoader>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductDetailsPlaceholder
