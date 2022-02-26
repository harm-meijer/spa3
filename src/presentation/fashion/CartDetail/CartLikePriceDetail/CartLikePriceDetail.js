import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import DiscountCodes from './DiscountCodes/DiscountCodes.vue';

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
    cartLike: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();

    return { t, ...props.cartLike.cartTools };
  },
};
