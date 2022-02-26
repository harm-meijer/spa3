import { useCartActions } from 'hooks/useCartMutation';
import config from '../../../../sunrise.config';

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

    const cartTools = {
      ...cartActions,
      cartNotEmpty,
      total,
      lineItemAttr,
      productRoute,
      displayedImageUrl,
    };
    return {
      cartTools,
    };
  },
};
