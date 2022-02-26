//@todo: we need this scrollbar for correct style
// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import LineItemDeleteForm from 'presentation/components/LineItemQuantityForm/Remove/Remove.vue';

export default {
  name: 'MiniCart',
  components: {
    LineItemDeleteForm,
    CartLike,
    // LineItemInfo,
    // VuePerfectScrollbar,
    BasePrice,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
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
    open: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    //@todo: close minicart if deleting line has empty cart
    //  usecartNotEmpty from CartLike
    const { t } = useI18n();
    return {
      t,
      ...props.cartLike.cartTools,
    };
  },
};
