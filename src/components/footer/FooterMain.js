import React from 'react'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const links = [
  // prettier-ignore
  ['questions?', 'help', 'track order', 'returns'],
  // eslint-disable-next-line
  ["what's in store", 'women', 'men', 'product A-Z', 'buy gift vouchers'],
  ['follow us', 'facebook', 'twitter', 'youtube'],
]

/* eslint-disable react/no-array-index-key, jsx-a11y/anchor-is-valid */
const cols = t =>
  links.reduce((acc, curr, colIndex) => {
    const singleCol = (
      <Col key={colIndex} xs={12} sm={6}>
        {curr.map((linkText, index) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: !index ? 16 : 0,
                textTransform: !index ? 'uppercase' : 'capitalize',
              }}
            >
              <a>
                <Text strong={index === 0}>{t(linkText)}</Text>
              </a>
            </div>
          )
        })}
      </Col>
    )

    return acc.concat([singleCol])
  }, [])

const FooterMain = () => {
  const { t } = useTranslation()
  return (
    <Row gutter={16}>
      {cols(t)}
      <Col xs={24} style={{ marginTop: 16, textAlign: 'center' }}>
        <hr />
        &copy; {new Date().getFullYear()} {t('TShirtShop. All Rights Reserved')}
      </Col>
    </Row>
  )
}

export default FooterMain
