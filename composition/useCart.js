import gql from 'graphql-tag';
import useLocale from './useLocale';
import useQueryFacade from './useQueryFacade';
import useState from './useState';
//@todo: we will worry about importing the partials
//  when the cart route is done
const query = gql`
  query myCart($locale: Locale!) {
    me {
      activeCart {
        id
        version
        lineItems {
          id
          name(locale: $locale)
          productSlug(locale: $locale)
          quantity
          price {
            value {
              centAmount
              currencyCode
              fractionDigits
            }
            discounted {
              value {
                centAmount
                currencyCode
                fractionDigits
              }
            }
          }
          totalPrice {
            centAmount
            currencyCode
            fractionDigits
          }
          variant {
            sku
            images {
              url
            }
            attributesRaw {
              name
              value
              attributeDefinition {
                type {
                  name
                }
                name
                label(locale: $locale)
              }
            }
          }
        }
        totalPrice {
          centAmount
          currencyCode
          fractionDigits
        }
        shippingInfo {
          shippingMethod {
            id
            name
            localizedDescription(locale: $locale)
          }
          price {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        taxedPrice {
          totalGross {
            centAmount
            currencyCode
            fractionDigits
          }
          totalNet {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        discountCodes {
          discountCode {
            id
            code
            name(locale: $locale)
          }
        }
        shippingAddress {
          firstName
          lastName
          streetName
          additionalStreetInfo
          postalCode
          city
          country
          phone
          email
        }
        billingAddress {
          firstName
          lastName
          streetName
          additionalStreetInfo
          postalCode
          city
          country
          phone
          email
        }
      }
    }
  }
`;
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
export default () => {
  const { locale } = useLocale();
  const [cart, setCart] = useState();
  const { loading, error } = useQueryFacade(query, {
    variables: { locale },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setCart(data.me.activeCart);
    },
  });
  return { cart, loading, error };
};
