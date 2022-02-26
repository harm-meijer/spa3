import { useI18n } from 'vue-i18n';
import LineItemInfo from './LineItemInfo/LineItemInfo.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
export default {
  components: {
    LineItemInfo,
    CartLike,
  },
  props: {
    cart: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useI18n();
    const selectReturnItem = () => {
      //@todo: return items not implemented
    };
    const unselectReturnItem = () => {
      //@todo: return items not implemented
    };
    return { selectReturnItem, unselectReturnItem, t };
  },
};
