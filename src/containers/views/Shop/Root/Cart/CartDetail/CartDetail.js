import { useI18n } from 'vue-i18n';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
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
  props: {
    cart: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object,
      required: false,
    },
    cartNotEmpty: {
      type: Boolean,
      required: true,
    },
    cartActions: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
