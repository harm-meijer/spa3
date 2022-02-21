import gql from 'graphql-tag';
import useQueryFacade from '../useQueryFacade';
import { useState, useEffect } from 'react';
import { getValue } from '../../src/lib';
const minimum = gql`
  query myCart {
    me {
      activeCart {
        cartId: id
        version
        lineItems {
          lineId: id
          quantity
        }
      }
    }
  }
`;

//@todo: we will worry about importing the partials
//  when the cart route is done
const createQuery = (expand) =>
  expand.minimum
    ? minimum
    : gql`
  query myCart($locale: Locale!) {
    me {
      activeCart {
        cartId: id
        version
        ${
          expand.lineItems
            ? `
        lineItems {
          lineId: id
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
        }`
            : ''
        }
        totalPrice {
          centAmount
          currencyCode
          fractionDigits
        }
        shippingInfo {
          shippingMethod {
            methodId: id
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
            codeId: id
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
const useCart = ({ expand = {}, locale }) => {
  const [cart, setCart] = useState();
  const [exist, setExist] = useState();
  const [query, setQuery] = useState(
    createQuery(getValue(expand))
  );
  useEffect(() => {
    setQuery(createQuery(getValue(expand)));
  }, [expand]);

  const { loading, error } = useQueryFacade(query, {
    variables: { locale },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setCart(data.me.activeCart);
    },
  });
  useEffect(
    () =>
      setExist(
        !getValue(loading) && !getValue(error)
          ? Boolean(getValue(cart))
          : undefined
      ),
    [cart, loading, error]
  );
  return { cart, exist, loading, error };
};
export default useCart;
