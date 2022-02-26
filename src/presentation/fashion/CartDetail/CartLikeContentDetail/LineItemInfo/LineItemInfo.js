import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { computed, shallowRef, watch } from 'vue';
import LineItemQuantityForm from 'presentation/components/LineItemQuantityForm/LineItemQuantityForm.vue';

import Remove from 'presentation/components/LineItemQuantityForm/Remove/Remove.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
export default {
  components: {
    LineItemQuantityForm,
    Remove,
    BasePrice,
    CartLike,
  },
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
    extended: {
      type: Boolean,
      default: () => true,
    },
    editable: {
      type: Boolean,
      default: () => true,
    },
    selectable: {
      type: Boolean,
      default: () => false,
    },
    cartLike: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const selected = shallowRef(false);
    const item = computed(() =>
      props.selectable
        ? {
            lineItemId: this.lineItem.id,
            quantity: this.lineItem.quantity,
            shipmentState: 'Advised',
          }
        : null
    );
    watch(selected, (selected) => {
      if (selected === true) {
        emit('select-return-item', item);
      }
      if (this.selected === false) {
        emit('unselect-return-item', item);
      }
    });
    return {
      ...props.cartLike.cartTools,
    };
  },
};
