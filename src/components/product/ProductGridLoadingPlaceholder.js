import React from 'react'
import { Card, List } from 'antd'
import ContentLoader from 'react-content-loader'

export default function ProductGridLoadingPlaceholder() {
  const tempItems = [...Array(10).keys()].map(x => x + 1)

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 2, md: 3, xxl: 5 }}
      dataSource={tempItems}
      renderItem={() => (
        <List.Item>
          <Card bodyStyle={{ padding: 12 }} className="product-skeleton">
            <ContentLoader
              height={500}
              width={500}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="20" y="20" rx="0" ry="0" width="460" height="300" />
              <rect x="20" y="419" rx="0" ry="0" width="258" height="33" />
              <rect x="20" y="376" rx="0" ry="0" width="374" height="22" />
            </ContentLoader>
          </Card>
        </List.Item>
      )}
    />
  )
}
