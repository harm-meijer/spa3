import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { ref } from 'vue';

import useProducts from '../../composition/ct/useProducts';

//@todo mock route for useCategories
// jest.mock('../../composition/', () => {
//   return jest.fn((a, b, c) => ({ a, b, c }));
// });
const server = setupServer(
  // Describe the requests to mock.
  graphql.query('products', (req, res, ctx) => {
    console.log('------ok, we intercept');
    return res(
      ctx.data({
        data: {
          productProjectionSearch: {
            total: 2702,
            results: [
              {
                productId:
                  '3819bdf7-441b-41d7-84fa-471118278d8e',
                name: 'Sweater Pinko white',
                masterVariant: {
                  variantId: 1,
                  sku: 'M0E20000000DJR9',
                  scopedPrice: {
                    value: {
                      currencyCode: 'EUR',
                      centAmount: 17000,
                      __typename: 'Money',
                    },
                    country: 'DE',
                    __typename: 'ScopedPrice',
                  },
                  __typename: 'ProductSearchVariant',
                },
                __typename: 'ProductProjection',
              },
              {
                productId:
                  '7465d818-db8b-43a6-9082-a6a8f83eca6f',
                name: 'Jogging pants Paolo Pecora light grey',
                masterVariant: {
                  variantId: 1,
                  sku: 'M0E20000000EAT6',
                  scopedPrice: {
                    value: {
                      currencyCode: 'EUR',
                      centAmount: 18500,
                      __typename: 'Money',
                    },
                    country: 'DE',
                    __typename: 'ScopedPrice',
                  },
                  __typename: 'ProductSearchVariant',
                },
                __typename: 'ProductProjection',
              },
            ],
            __typename: 'ProductProjectionSearchResult',
          },
        },
      })
    );
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
const createParams = (params) => ({
  locale: ref('en'),
  limit: ref(2),
  offset: ref(0),
  currency: ref('EUR'),
  country: ref('DE'),
  sorts: ref(null),
  categorySlug: ref(null),
  sku: ref(null),
  expand: {},
  ...params,
});
//@todo: vue.config.js is not used in testing:
//  https://stackoverflow.com/questions/71155594/vue-config-js-configurewebpack-not-used-in-unit-tests-vue-3
// const moduleName = require('../../composition/useProducts.js');
describe('useProducts', () => {
  it('returns 43', () => {
    expect(useProducts(createParams)).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
