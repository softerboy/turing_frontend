/* eslint-disable quotes */
import React from 'react'
import { Card, Typography } from 'antd'
import * as PropTypes from 'prop-types'
import { Trans, useTranslation } from 'react-i18next'

import NotFoundIcon from '../icons/NotFoundIcon'

const { Text, Title } = Typography

function EmptySearchPlaceholder({ term }) {
  const { t } = useTranslation()

  const searchTips = [
    t('Check your spelling and try again'),
    t('Try similar but different search term, like seasonal instead autumn'),
    // prettier-ignore
    t('Keep your search term simple as our search facility works best with shorter descriptions'),
  ]

  return (
    <Card style={{ textAlign: 'center' }}>
      <NotFoundIcon style={{ fontSize: '4rem', margin: 30, fill: '#fa8c16' }} />
      <Title level={3}>
        <Trans>
          Sorry, we couldn&#39;t not find any results matching &#34;
          <strong>{{ term }}</strong>&#34;
        </Trans>
      </Title>
      <hr />
      <div style={{ textAlign: 'left', padding: 16 }}>
        <Title level={4} type="secondary">
          {t('Search tips:')}
        </Title>
        <ul>
          {searchTips.map(tip => (
            <li key={tip}>
              <Text>{tip}</Text>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default EmptySearchPlaceholder

EmptySearchPlaceholder.propTypes = {
  term: PropTypes.string.isRequired,
}
