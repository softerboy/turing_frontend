/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

import { Auth } from '../../pages/Auth'
import '../../i18n'

import QUERY from '../../graphql/customer-register-mutation.graphql'

const mocks = [
  {
    request: {
      query: QUERY,
      variables: {
        name: 'John',
        email: 'john@doe.com',
        password: 'P@s#wrd1',
      },
    },
    result: {
      data: {
        customerRegister: {
          customer_id: 1,
          name: 'John',
          email: 'john@doe.com',
          address_1: null,
          address_2: null,
          city: null,
          region: null,
          postal_code: null,
          country: null,
          shipping_region_id: null,
          day_phone: 1,
          eve_phone: null,
          mob_phone: null,
          credit_card: null,
          accessToken: 'token',
          expires_in: null,
        },
      },
    },
  },
]

describe('Auth', () => {
  it('should render without error', () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <Auth register />
        </BrowserRouter>
      </MockedProvider>,
    )

    const tree = component.toJSON()
    expect(JSON.stringify(tree.children)).toContain('Sign up')
  })
})
