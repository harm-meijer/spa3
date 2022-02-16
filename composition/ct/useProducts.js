import gql from 'graphql-tag';
import { getValue } from '../../src/lib';
import useCategories from '../useCategories';
import { useEffect, useState } from 'react';
import useQuery from '../useQueryFacade';
//@todo: channel (do in react mock in vue)
//@todo: channel for logged in user (do in React, mock in Vue)
//@todo: pass sort
//@todo: we will worry about importing the partials
//  when the cart route is done
const query = (expand) => gql`
  query products(
    $locale: Locale!
    $limit: Int!
    $offset: Int!
    $priceSelector: PriceSelectorInput!
    $sorts: [String!] = []
    $filters: [SearchFilterInput!] = []
  ) {
    productProjectionSearch(
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
          scopedPrice {
            value {
              currencyCode
              centAmount
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

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useProducts = ({
  locale,
  limit,
  offset,
  currency,
  country,
  sorts,
  categorySlug,
  expand = {},
  sku,
}) => {
  const [products, setProducts] = useState();
  const [priceSelector, setPriceSelector] = useState({
    currency: getValue(currency),
    country: getValue(country),
  });
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
    setPriceSelector({
      currency: getValue(currency),
      country: getValue(country),
    });
  }, [currency, country]);
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
      setProducts(
        data.productProjectionSearch.results.map(
          ({ masterVariant, name, variants }) => [
            name,
            masterVariant,
            variants,
          ]
        )
      );
      setTotal(data.productProjectionSearch.total);
    },
    skip,
  });
  return { total, products, loading, error };
};
export default useProducts;
