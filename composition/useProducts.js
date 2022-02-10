import gql from 'graphql-tag';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ALL } from '../src/constants';
import { getValue } from '../src/lib';
import useCategory from './useCategories';
import useCurrency from './useCurrency';
import useEffect from './useEffect';
import useLocale from './useLocale';
import useLocation from './useLocation';
import usePaging from './usePaging';
import useQuery from './useQueryFacade';
import useState from './useState';
//@todo: channel after selecting store
//@todo: channel for logged in user after login
//@todo: order by
//@todo: is currency optional?
//@todo: we will worry about importing the partials
//  when the cart route is done
const createQuery = (where) =>
  gql`
  query products(
    $locale: Locale!
    $limit: Int!
    $currency: Currency!
    $country: Country!
    ${where ? '$where: String!' : ''}
  ) {
    products(limit: $limit, ${
      where ? 'where: $where' : ''
    }) {
      count
      total
      results {
        id
        masterData {
          current {
            name(locale: $locale)
            slug(locale: $locale)
            categoriesRef {
              typeId
              id
            }
            masterVariant {
              price(
                country: $country
                currency: $currency
              ) {
                value {
                  currencyCode
                  centAmount
                  fractionDigits
                }
              }
            }
          }
        }
      }
    }
  }
`;
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
  const [categoryId, setCategoryId] = useState(null);
  const [skipCategory, setSkipCategory] = useState(
    !getValue(categorySlug)
  );
  const [skip, setSkip] = useState(true);
  const [total, setTotal] = useState();
  const [where, setWhere] = useState();

  //@todo: Error handling needed
  const { categories } = useCategory({
    categorySlug,
    skip: skipCategory,
  });
  useEffect(() => {
    setSkipCategory(!getValue(categorySlug));
    setSkip(
      getValue(categorySlug) && !getValue(categoryId)
    );
  }, [categorySlug, categoryId]);
  useEffect(() => {
    setCategoryId(
      getValue(categorySlug) && getValue(categories)
        ? getValue(categories)[0].id
        : null
    );
  }, [categories]);
  useEffect(
    () =>
      setWhere(
        getValue(categorySlug) && getValue(categoryId)
          ? `masterData(current(categories(id="${getValue(
              categoryId
            )}")))`
          : null
      ),
    [categoryId]
  );
  const { loading, error } = useQuery(createQuery(where), {
    variables: {
      locale,
      currency,
      country,
      limit,
      offset,
      where,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setProducts(data.products.results);
      setTotal(data.products.total);
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
