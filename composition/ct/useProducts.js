import gql from 'graphql-tag';
import { getValue } from '../../src/lib';
import useCategories from '../useCategories';
import { useEffect, useState } from 'react';
import useQuery from '../useQueryFacade';
//@todo: price for logged in user (do in React, mock in Vue)
//@todo: we will worry about importing the partials
//  when the cart route is done
const query = (expand) => gql`
  query products(
    $locale: Locale!
    $limit: Int!
    $offset: Int!
    $priceSelector: PriceSelectorInput!
    $sorts: [String!] = []
    $filters: [SearchFilterInput!] = [],
    $text: String = ""
  ) {
    productProjectionSearch(
      locale: $locale
      text: $text
      limit: $limit
      offset: $offset
      sorts: $sorts
      priceSelector: $priceSelector
      filters: $filters
    ) {
      total
      results {
        # better never select id or cache breaks
        # https://github.com/apollographql/apollo-client/issues/9429
        productId: id
        name(locale: $locale)
        slug(locale: $locale)
        ${
          expand.variants
            ? `variants {
          variantId: id
          sku
          scopedPrice {
            value {
              currencyCode
              centAmount
            }
            country
          }
        }`
            : ''
        }
        masterVariant {
          # better never select id or cache breaks
          # https://github.com/apollographql/apollo-client/issues/9429
          variantId: id
          sku
          images {
         	  url 
          }
          scopedPrice {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
            discounted {
              value {
                currencyCode
                centAmount
                fractionDigits
              }
            }
            country
          }
        }
      }
    }
  }
`;

function useCategoryId({ categorySlug, setSkip }) {
  const [skipCategory, setSkipCategory] = useState(
    !getValue(categorySlug)
  );
  const [categoryId, setCategoryId] = useState(null);
  //@todo: Error handling needed
  const { categories } = useCategories({
    categorySlug,
    skip: skipCategory,
  });
  useEffect(() => {
    setSkipCategory(!getValue(categorySlug));
    setSkip(
      getValue(categorySlug) && !getValue(categoryId)
    );
  }, [categorySlug, categoryId, setSkip]);
  useEffect(() => {
    setCategoryId(
      getValue(categorySlug) && getValue(categories)
        ? getValue(categories)[0].id
        : null
    );
  }, [categories, categorySlug]);
  return categoryId;
}
const updateFilters = (
  filters,
  sku,
  categoryId,
  categorySlug
) =>
  filters
    .filter(
      (f) => !(f?.model?.value?.path === 'variants.sku')
    )
    .filter(
      (filter) =>
        !(filter?.model?.tree?.path === 'categories.id')
    )
    .concat(
      sku
        ? {
            model: {
              value: {
                path: 'variants.sku',
                values: [sku],
              },
            },
          }
        : undefined
    )
    .concat(
      categorySlug && categoryId
        ? {
            model: {
              tree: {
                path: 'categories.id',
                rootValues: [],
                subTreeValues: [getValue(categoryId)],
              },
            },
          }
        : undefined
    )
    .filter((f) => f);
const createPriceSelector = (currency, country, store) => ({
  currency: getValue(currency),
  country: getValue(country),
  channel: getValue(store)
    ? {
        typeId: 'priceChannel',
        id: getValue(store),
      }
    : null,
});
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useProducts = ({
  search,
  locale,
  limit,
  offset,
  currency,
  country,
  sorts,
  categorySlug,
  expand = {},
  sku,
  store,
}) => {
  const [products, setProducts] = useState();
  const [priceSelector, setPriceSelector] = useState(
    createPriceSelector(currency, country, store)
  );
  const [skip, setSkip] = useState(true);
  const [total, setTotal] = useState();
  const categoryId = useCategoryId({
    categorySlug,
    setSkip,
  });
  const [filters, setFilters] = useState(() =>
    updateFilters(
      [
        {
          model: {
            range: {
              path: 'variants.scopedPrice.value.centAmount',
              ranges: [
                {
                  from: '0',
                  to: '1000000000000',
                },
              ],
            },
          },
        },
      ],
      getValue(sku),
      getValue(categoryId),
      getValue(categorySlug)
    )
  );
  useEffect(() => {
    setPriceSelector(
      createPriceSelector(currency, country, store)
    );
  }, [currency, country, store]);
  useEffect(
    () =>
      setFilters((filters) =>
        updateFilters(
          filters,
          getValue(sku),
          getValue(categoryId),
          getValue(categorySlug)
        )
      ),
    [categoryId, categorySlug, sku]
  );
  const { loading, error } = useQuery(query(expand), {
    variables: {
      text: search,
      locale,
      limit,
      offset,
      sorts,
      priceSelector,
      filters,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setProducts(data.productProjectionSearch.results);
      setTotal(data.productProjectionSearch.total);
    },
    skip,
  });
  return { total, products, loading, error };
};
export default useProducts;
