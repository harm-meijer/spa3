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
  },
  setup() {
    const { t } = useI18n();
    const selectReturnItem = (...args) => {
      console.log('selectReturn', args);
    };
    const unselectReturnItem = (...args) => {
      console.log('unselect return', args);
    };
    return { selectReturnItem, unselectReturnItem, t };
  },
};
