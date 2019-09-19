/* eslint-disable react/prop-types,react/jsx-props-no-spreading, react/no-array-index-key */
import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = props => {
  return (
    <ContentLoader
      height={100}
      width={500}
      speed={2}
      primaryColor="#E3E3E3"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="20" rx="5" ry="5" width="64" height="12" />
      <rect x="0" y="40" rx="3" ry="3" width="32" height="6" />
      <rect x="105" y="20" rx="5" ry="5" width="350" height="12" />
      <rect x="105" y="40" rx="5" ry="5" width="280" height="12" />
      <rect x="105" y="60" rx="5" ry="5" width="225" height="12" />
    </ContentLoader>
  )
}

const ImageList = () =>
  Array(3)
    .fill('')
    .map((e, i) => <Loader key={i} />)

export default ImageList
