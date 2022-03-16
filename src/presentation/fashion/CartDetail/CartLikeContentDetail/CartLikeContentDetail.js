import { useI18n } from 'vue-i18n';
import LineItemInfo from './LineItemInfo/LineItemInfo.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import { shallowRef } from 'vue';
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
  setup(_, { emit }) {
    const { t } = useI18n();
    const selectedReturnItems = shallowRef([]);
    const selectReturnItem = (item) => {
      selectedReturnItems.value = selectedReturnItems.value
        .filter(({ id }) => id !== item.id)
        .concat(item);
      emit(
        'update-selected-items',
        selectedReturnItems.value
      );
    };
    const unselectReturnItem = (item) => {
      selectedReturnItems.value =
        selectedReturnItems.value.filter(
          ({ id }) => id !== item.id
        );
      emit(
        'update-selected-items',
        selectedReturnItems.value
      );
    };
    return { selectReturnItem, unselectReturnItem, t };
  },
};
