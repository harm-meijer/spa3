import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import DiscountCodes from './DiscountCodes/DiscountCodes.vue';
import { computed } from 'vue';
// import { subTotal } from '../../shared';

//@todo: this is probably shared with minicart
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
  components: {
    DiscountCodes,
    BasePrice,
  },
  props: {
    cart: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const subtotal = computed(() => {
      return subTotal(props.cart);
    });
    const taxes = computed(() => {
      const { taxedPrice } = props.cart;
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
    });
    const discountCodesExist = computed(() => {
      return props.cart.discountCodes?.length;
    });

    return { t, subtotal, taxes, discountCodesExist };
  },
};
