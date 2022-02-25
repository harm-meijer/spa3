import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'AddToCartForm',
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
    addCaption: {
      type: String,
      default: 'addToCart',
    },
    cartActions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const quantity = shallowRef(1);
    const showQuantityError = shallowRef(false);
    const { addLine } = props.cartActions;
    const addLineItem = () =>
      addLine(props.sku, quantity.value);
    return { t, addLineItem, quantity, showQuantityError };
  },
};
