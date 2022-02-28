import { cache } from '../../src/apollo';
import { getValue } from '../../src/lib';
import useMutation from '../useMutationFacade';
import useCart from '../useCart';
import gql from 'graphql-tag';
import { useEffect } from 'react';
const create = gql`
  mutation creatCart($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      cartId: id
      version
    }
  }
`;
const mutation = gql`
  mutation mutateCart(
    $actions: [MyCartUpdateAction!]!
    $version: Long!
    $id: String!
  ) {
    updateMyCart(
      actions: $actions
      version: $version
      id: $id
    ) {
      id
      version
    }
  }
`;

export const addLineItem = (sku, quantity) => [
  {
    addLineItem: { sku, quantity },
  },
];

export const changeCartLineItemQuantity = (
  id,
  quantity
) => [
  {
    changeLineItemQuantity: { lineItemId: id, quantity },
  },
];
export const removeLineItem = (lineItemId) => [
  {
    removeLineItem: { lineItemId },
  },
];
export const addDiscountCode = (code) => [
  { addDiscountCode: { code } },
];
export const removeDiscountCode = (id) => [
  {
    removeDiscountCode: {
      discountCode: { id, typeId: 'discount-code' },
    },
  },
];
export const setShippingMethod = (shippingMethodId) => [
  {
    setShippingMethod: {
      shippingMethod: {
        typeId: 'shipping-method',
        id: shippingMethodId,
      },
    },
  },
];

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useCartMutation = ({ location, currency }) => {
  const [mutateFunction, { data, loading, error }] =
    useMutation(mutation);
  const [createCart] = useMutation(create);
  const { cart, exist } = useCart({
    expand: { minimum: true },
  });
  useEffect(() => {
    if (getValue(data)) {
      cache.reset();
    }
  }, [data]);
  const mutateCart = (actions) => {
    return Promise.resolve()
      .then(() => {
        if (!getValue(exist) === true) {
          return createCart({
            variables: {
              draft: {
                currency: getValue(currency),
                country: getValue(location),
                shippingAddress: {
                  country: getValue(location),
                },
              },
            },
          }).then((result) => ({
            version: result.data.createMyCart.version,
            id: result.data.createMyCart.cartId,
          }));
        }
        return {
          version: getValue(cart).version,
          id: getValue(cart).cartId,
        };
      })
      .then(({ version, id }) =>
        mutateFunction({
          variables: {
            actions,
            version,
            id,
          },
        })
      );
  };
  return {
    mutateCart,
    data,
    loading,
    error,
  };
};

export default useCartMutation;
