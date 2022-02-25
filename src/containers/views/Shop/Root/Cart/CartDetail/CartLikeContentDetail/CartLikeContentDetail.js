import { useI18n } from 'vue-i18n';
import LineItemInfo from './LineItemInfo/LineItemInfo.vue';

export default {
  components: {
    LineItemInfo,
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
    cartActions: {
      type: Object,
      required: true,
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
