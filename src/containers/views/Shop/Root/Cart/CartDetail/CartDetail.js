import { useI18n } from 'vue-i18n';
import useCart from 'hooks/useCart';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import { computed } from 'vue';
import CartLikeContentDetail from './CartLikeContentDetail/CartLikeContentDetail.vue';
import AddDiscountCodeForm from './AddDiscountCodeForm/AddDiscountCodeForm.vue';
import CartLikePriceDetail from './CartLikePriceDetail/CartLikePriceDetail.vue';
// import AddDiscountCodeForm from '../AddDiscountCodeForm/AddDiscountCodeForm.vue';
export default {
  name: 'CartDetail',
  components: {
    Spinner,
    CartLikeContentDetail,
    AddDiscountCodeForm,
    CartLikePriceDetail,
  },
  //@todo: move up and move this to presentation
  setup() {
    const { cart, loading, error } = useCart({
      expand: { lineItems: true },
    });
    const { t } = useI18n();
    const cartNotEmpty = computed(
      () =>
        cart.value && Boolean(cart.value?.lineItems?.length)
    );
    return {
      cart,
      loading,
      error,
      cartNotEmpty,
      t,
    };
  },
};
