/*
  eslint-disable
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions,
  react/prop-types,
  camelcase
*/
import React, { useRef } from 'react'
import { Carousel, Col, Row } from 'antd'
import ReactImageMagnify from 'react-image-magnify'

import { PRODUCT_IMG_ROOT } from '../../common/constants'
import styles from './ProductCarousel.module.less'

function renderImageWithMagnify({ image, image_2 }) {
  return [image, image_2].map(img => (
    <ReactImageMagnify
      key={img}
      className={styles.carouselImageNormalContainer}
      imageClassName={styles.carouselImageNormal}
      enlargedImageClassName={styles.carouselImageLarge}
      enlargedImagePosition="over"
      hoverDelayInMs={0}
      smallImage={{
        alt: img,
        isFluidWidth: true,
        src: `${PRODUCT_IMG_ROOT}/${img}`,
      }}
      largeImage={{
        src: `${PRODUCT_IMG_ROOT}/${img}`,
        width: 600,
        height: 600,
      }}
    />
  ))
}

const ProductCarousel = ({ product }) => {
  const carouselRef = useRef(null)

  const gotoSlide = slide => {
    const carousel = carouselRef.current
    carousel.goTo(slide)
  }

  return (
    <Row>
      <Col>
        <Carousel className={styles.carousel} ref={carouselRef}>
          {renderImageWithMagnify(product)}
        </Carousel>
      </Col>
      <Col>
        <Row type="flex" justify="center">
          <img
            onClick={gotoSlide.bind(this, 0)}
            className={styles.thumb}
            alt={product.image}
            src={`${PRODUCT_IMG_ROOT}/${product.image}`}
          />
          <img
            onClick={gotoSlide.bind(this, 1)}
            className={styles.thumb}
            alt={product.image_2}
            src={`${PRODUCT_IMG_ROOT}/${product.image_2}`}
          />
        </Row>
      </Col>
    </Row>
  )
}

export default ProductCarousel
