import gql from 'graphql-tag';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ALL } from '../src/constants';
import { getValue } from '../src/lib';
import useCategories from './useCategories';
import useCurrency from './useCurrency';
import useEffect from './useEffect';
import useLocale from './useLocale';
import useLocation from './useLocation';
import usePaging from './usePaging';
import useQuery from './useQueryFacade';
import useState from './useState';
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
        id
        name(locale: $locale)
        masterVariant {
          id
          scopedPrice {
            value {
              currencyCode
              centAmount
            }
            country
          }
        }
        # variants {
        #   id
        #   scopedPrice {
        #     value {
        #       currencyCode
        #       centAmount
        #     }
        #     country
        #     # customerGroup {
        #     #   name
        #     # }
        #     # channel {
        #     #   name(locale: $locale)
        #     # }
        #   }
        # }
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
  categorySlug,
}) => {
  const { limit, offset } = usePaging(page);
  const [products, setProducts] = useState();
  const [priceSelector, setPriceSelector] = useState();
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
        if (getValue(categoryId)) {
          return [
            ...filters,
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
        return filters;
      }),
    [categoryId, categorySlug]
  );
  const { loading, error } = useQuery(query, {
    variables: {
      locale,
      limit,
      offset,
      sorts: null, //@todo: implement sort
      priceSelector,
      filters,
      country,
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
//vue specific useProducts
export default () => {
  const route = useRoute();
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const categorySlug = computed(() =>
    route.params.categorySlug === ALL
      ? null
      : route.params.categorySlug
  );
  const page = computed(() => route.params.page || 1);

  const { total, products, loading, error } = useProducts({
    page,
    locale,
    currency,
    country: location,
    categorySlug,
  });
  return { total, products, loading, error };
};
