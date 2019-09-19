import React from 'react'
import ContentLoader from 'react-content-loader'

export default function FilterPlaceholder() {
  return (
    <ContentLoader
      height={600}
      width={300}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="300" height="498" />
      <rect x="2" y="530" rx="18" ry="18" width="299" height="41" />
    </ContentLoader>
  )
}
