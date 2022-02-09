import gql from 'graphql-tag';
import useCurrency from './useCurrency';
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
const query = gql`
  query products(
    $locale: Locale!
    $limit: Int!
    $offset: Int!
    $currency: Currency!
    $country: Country!
  ) {
    products(limit: $limit, offset: $offset) {
      count
      total
      results {
        id
        masterData {
          current {
            name(locale: $locale)
            slug(locale: $locale)
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
}) => {
  const { limit, offset } = usePaging(page);
  const [products, setProducts] = useState();
  const [total, setTotal] = useState();
  const { loading, error } = useQuery(query, {
    variables: { locale, currency, country, limit, offset },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setProducts(data.products.results);
      setTotal(data.products.total);
    },
  });
  return { total, products, loading, error };
};
//vue specific useProducts
export default ({ page }) => {
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const { total, products, loading, error } = useProducts({
    page,
    locale,
    currency,
    country: location,
  });
  return { total, products, loading, error };
};
