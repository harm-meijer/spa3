import { shallowRef, watch } from 'vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
import useCartMutation, {
  changeCartLineItemQuantity,
  removeLineItem as createRemoveAction,
} from 'hooks/useCartMutation';

//could be in lib
const debounce = (fn, time = 500) => {
  const current = {};
  const check = { current };
  return (...args) => {
    const current = {};
    check.current = current;
    setTimeout(() => {
      if (check.current === current) {
        fn(...args);
      }
    }, time);
  };
};

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
    const changeLine = debounce((quantity = 1) => {
      if (!quantity) {
        return;
      }
      mutateCart(
        changeCartLineItemQuantity(
          props.lineItemId,
          quantity
        )
      );
    });
    watch(quantity_, (q) => changeLine(q));
    const changeLineItemQuantity = () => {
      return changeLine(quantity_.value);
    };
    const removeLineItem = () => {
      mutateCart(createRemoveAction(props.lineItemId));
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
  },
};
