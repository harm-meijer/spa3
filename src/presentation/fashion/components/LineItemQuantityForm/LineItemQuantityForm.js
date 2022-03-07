import { shallowRef, watch } from 'vue';

export default {
  name: 'LineItemQuantityForm',
  components: {
    // BaseForm,
    // BaseInput,
  },
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    cartLike: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const quantity_ = shallowRef(props.quantity);
    const { changeLine: cl, removeLineItem: rm } =
      props.cartLike.cartTools;
    const changeLine = () =>
      cl(props.lineItemId, quantity_.value);
    const removeLineItem = () => rm(props.lineItemId);
    watch(quantity_, (q) => {
      if (q === '') {
        return;
      }
      changeLine(q);
      if (q <= 0) {
        removeLineItem();
      }
    });
    const changeLineItemQuantity = () => {
      return changeLine(quantity_.value);
    };
    const increment = () => {
      quantity_.value += 1;
    };
    const decrement = () => {
      quantity_.value -= 1;
    };

    return {
      quantity_,
      increment,
      decrement,
      removeLineItem,
      changeLineItemQuantity,
    };
  },
};
