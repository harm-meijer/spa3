import gql from 'graphql-tag';
import { getValue } from '../../src/lib';
import useCategories from '../useCategories';
import { useEffect, useState } from 'react';
import usePaging from '../usePaging';
import useQuery from '../useQueryFacade';
//@todo: channel (do in react mock in vue)
//@todo: channel for logged in user (do in React, mock in Vue)
//@todo: pass sort
//@todo: we will worry about importing the partials
//  when the cart route is done
const query = gql`
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
        masterVariant {
          # better never select id or cache breaks
          # https://github.com/apollographql/apollo-client/issues/9429
          variantId: id
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
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useProducts = ({
  locale,
  page,
  currency,
  country,
  sorts,
  categorySlug,
}) => {
  const { limit, offset } = usePaging(page);
  const [products, setProducts] = useState();
  const [priceSelector, setPriceSelector] = useState({
    currency: getValue(currency),
    country: getValue(country),
  });
  const [skip, setSkip] = useState(true);
  const [total, setTotal] = useState();
  const [filters, setFilters] = useState([
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
  ]);
  const categoryId = useCategoryId({
    categorySlug,
    setSkip,
  });
  useEffect(() => {
    setPriceSelector({
      currency: getValue(currency),
      country: getValue(country),
    });
  }, [currency, country]);
  useEffect(
    () =>
      setFilters((filters) => {
        const newFilters = filters.filter(
          (filter) => !filter?.model?.tree?.path
        );
        if (getValue(categoryId)) {
          return [
            ...newFilters,
            {
              model: {
                tree: {
                  path: 'categories.id',
                  rootValues: [],
                  subTreeValues: [getValue(categoryId)],
                },
              },
            },
          ];
        }
        return newFilters;
      }),
    [categoryId, categorySlug]
  );
  const { loading, error } = useQuery(query, {
    variables: {
      locale,
      limit,
      offset,
      sorts, //@todo: implement sort
      priceSelector,
      filters,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setProducts(
        data.productProjectionSearch.results.map(
          ({ masterVariant, name }) => [
            name,
            masterVariant.scopedPrice.value.currencyCode,
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
