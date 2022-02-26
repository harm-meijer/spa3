import { useCartActions } from 'hooks/useCartMutation';
import config from '../../../../sunrise.config';
function subTotal(cartLike) {
  const { currencyCode, fractionDigits } =
    cartLike.totalPrice;
  const priceCentAmount = cartLike.lineItems.reduce(
    (acc, li) =>
      acc + li.quantity * li.price.value.centAmount,
    0
  );
  const totalPriceCentAmount = cartLike.lineItems.reduce(
    (acc, li) => acc + li.totalPrice.centAmount,
    0
  );
  const discounted =
    priceCentAmount === totalPriceCentAmount
      ? {}
      : {
          discounted: {
            value: {
              centAmount: totalPriceCentAmount,
              currencyCode,
              fractionDigits,
            },
          },
        };
  return {
    value: {
      centAmount: priceCentAmount,
      currencyCode,
      fractionDigits,
    },
    ...discounted,
  };
}

export default {
  name: 'CartLike',
  setup() {
    const cartActions = useCartActions();
    const cartNotEmpty = (cart) =>
      Boolean(cart && Boolean(cart?.lineItems?.length));

    const total = (lineItem) => {
      return { value: lineItem.totalPrice };
    };
    const lineItemAttr = (lineItem) => {
      const attributes = lineItem.variant.attributesRaw
        .filter(({ name }) =>
          config.variantInProductName.includes(name)
        )
        .map(({ attributeDefinition, value }) => [
          attributeDefinition.label,
          value,
        ]);
      return attributes.join(', ');
    };

    const productRoute = (lineItem) => {
      return {
        name: 'product',
        params: {
          sku: lineItem.variant.sku,
          productSlug: lineItem.productSlug,
        },
      };
    };
    const displayedImageUrl = (variant) => {
      return variant?.images?.[0].url;
    };
    const subtotal = (cart) => {
      return subTotal(cart);
    };
    const taxes = (cart) => {
      const { taxedPrice } = cart;
      if (taxedPrice) {
        return {
          value: {
            centAmount:
              taxedPrice.totalGross.centAmount -
              taxedPrice.totalNet.centAmount,
            currencyCode:
              taxedPrice.totalGross.currencyCode,
            fractionDigits:
              taxedPrice.totalGross.fractionDigits,
          },
        };
      }
      return null;
    };
    const discountCodesExist = (cart) => {
      return Boolean(cart.discountCodes?.length);
    };

    const cartTools = {
      ...cartActions,
      cartNotEmpty,
      total,
      lineItemAttr,
      productRoute,
      displayedImageUrl,
      subtotal,
      taxes,
      discountCodesExist,
    };
    return {
      cartTools,
    };
  },
};
