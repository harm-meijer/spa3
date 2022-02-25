//@todo: we need this scrollbar for correct style
// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useCart from 'hooks/useCart';
import { useCartActions } from 'hooks/useCartMutation';
import useLocale from 'hooks/useLocale';
import config from '../../../../../sunrise.config';
import { getAttributeValue } from '../../../../containers/lib';
import LineItemDeleteForm from 'presentation/components/LineItemQuantityForm/Remove/Remove.vue';
//@todo: this function should be shared with lineItemInfo
export function subTotal(cartLike) {
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
  name: 'MiniCart',
  components: {
    LineItemDeleteForm,
    // LineItemInfo,
    // VuePerfectScrollbar,
    BasePrice,
  },
  props: {
    miniCart: {
      type: Object,
      required: true,
    },
  },
  //@todo: move to one hook, lineItemInfo shares the same needs
  setup(props) {
    const { open, close } = props.miniCart;
    const { t } = useI18n();
    const { cart, loading, error } = useCart({
      expand: { lineItems: true },
    });
    const cartNotEmpty = computed(() =>
      Boolean(
        cart.value && Boolean(cart.value?.lineItems?.length)
      )
    );
    const cartActions = useCartActions();
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
    const { locale } = useLocale();
    const lineItemAttr = (lineItem) => {
      const attributes = lineItem.variant.attributesRaw
        .filter(({ name }) =>
          config.variantInProductName.includes(name)
        )
        .map(({ attributeDefinition, value }) => [
          attributeDefinition.label,
          getAttributeValue(value, locale.value),
        ]);
      return attributes.join(', ');
    };
    const st = computed(() => {
      return subTotal(cart.value);
    });
    return {
      subtotal: st,
      lineItemAttr,
      displayedImageUrl,
      productRoute,
      cart,
      loading,
      error,
      cartNotEmpty,
      cartActions,
      open,
      close,
      t,
    };
  },
};
