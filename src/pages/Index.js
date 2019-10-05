import Loadable from 'react-loadable'

import FullPageLoader from '../components/FullPageLoader'

export const Home = Loadable({
  loader: () => import('./Home'),
  loading: FullPageLoader,
})

export const Auth = Loadable({
  loader: () => import('./Auth'),
  loading: FullPageLoader,
})

export const Checkout = Loadable({
  loader: () => import('./Checkout'),
  loading: FullPageLoader,
})

export const Product = Loadable({
  loader: () => import('./Product'),
  loading: FullPageLoader,
})

export const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: FullPageLoader,
})

export const ThankYou = Loadable({
  loader: () => import('./ThankYou'),
  loading: FullPageLoader,
})
