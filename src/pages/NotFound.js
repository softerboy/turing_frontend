import React from 'react'
import { Card, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

import NotFoundIcon from '../components/icons/NotFoundIcon'
import LayoutMain from '../components/layout/LayoutMain'

const { Text, Title } = Typography

function NotFound() {
  const { t } = useTranslation()

  return (
    <LayoutMain>
      <Card style={{ textAlign: 'center', margin: 32 }}>
        <NotFoundIcon style={{ fontSize: '4rem', color: '#fa8c16' }} />
        {/* eslint-disable-next-line */}
        <Title level={3}>{t("The page doesn't exist!")}</Title>
        <Text>
          {t('Sorry, the page you were looking for could not be found.')}
        </Text>
        <br />
        <Text>
          <Trans>
            You can return to our <Link to="/">home page</Link> or{' '}
            <Link to="/contacts">contact us</Link> if you can&apos;t find what
            you are looking for.
          </Trans>
        </Text>
      </Card>
    </LayoutMain>
  )
}

export default NotFound
