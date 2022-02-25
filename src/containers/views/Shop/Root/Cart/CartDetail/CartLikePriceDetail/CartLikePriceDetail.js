import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import DiscountCodes from './DiscountCodes/DiscountCodes.vue';
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
  setup() {
    const { t } = useI18n();
    return { t };
  },
  computed: {
    subtotal() {
      return subTotal(this.cart);
    },
    taxes() {
      const { taxedPrice } = this.cart;
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
    },
    discountCodesExist() {
      return this.cart.discountCodes?.length;
    },
  },
};