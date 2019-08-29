export default {
  auth: {
    customer_id: null,
    name: null,
    email: null,
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    postal_code: null,
    country: null,
    shipping_region_id: null,
    day_phone: null,
    eve_phone: null,
    mob_phone: null,
    credit_card: null,
    accessToken: null,
    expires_in: null,
    __typename: 'RegisterResponse',
  },

  productSortOptions: [
    {
      value: 'product_id',
      label: 'Default sort',
      __typename: 'SortItem',
    },
    {
      value: 'name',
      label: 'Name',
      __typename: 'SortItem',
    },
    {
      value: 'price',
      label: 'Price',
      __typename: 'SortItem',
    },
  ],
}
