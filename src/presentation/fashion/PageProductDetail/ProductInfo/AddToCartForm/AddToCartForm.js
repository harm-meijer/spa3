import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';

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
    cartLike: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseForm,
    ServerError,
  },
  setup(props) {
    const { t } = useI18n();
    const quantity = shallowRef(1);
    const showQuantityError = shallowRef(false);
    const { addLine } = props.cartLike.cartTools;
    const addLineItem = () =>
      addLine(props.sku, quantity.value);
    return { t, addLineItem, quantity, showQuantityError };
  },
};
