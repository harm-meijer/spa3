import { shallowRef, watch } from 'vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
import useCartMutation, {
  addLineItem,
} from 'hooks/useCartMutation';

export default {
  name: 'LineItemQuantityForm',
  components: {
    // ServerError,
    // BaseForm,
    // BaseInput,
  },
  setup(props) {
    const quantity_ = shallowRef(props.quantity);
    const { mutateCart } = useCartMutation();
    const changeLine = (quantity = 1) => {
      if (!quantity) {
        console.log('do nothing');
        return;
      }
      mutateCart(addLineItem(props.sku, quantity));
    };
    watch(quantity_, (q) => changeLine(q));
    const changeLineItemQuantity = () => {
      return changeLine(quantity_.value);
    };
    const removeLineItem = () => {
      console.log('remove line item');
      // return this.updateMyCart([
      //   {
      //     removeLineItem: {
      //       lineItemId: this.lineItemId,
      //     },
      //   },
      // ]);
    };
    const increment = () => {
      quantity_.value += 1;
    };
    const decrement = () => {
      if (quantity_.value > 1) {
        quantity_.value -= 1;
      } else {
        removeLineItem();
      }
    };

    return {
      quantity_,
      increment,
      decrement,
      removeLineItem,
      changeLineItemQuantity,
    };
  },
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
};
