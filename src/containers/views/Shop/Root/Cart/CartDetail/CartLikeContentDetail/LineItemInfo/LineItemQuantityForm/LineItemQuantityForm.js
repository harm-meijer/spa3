import { shallowRef } from 'vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';

export default {
  components: {
    // ServerError,
    // BaseForm,
    // BaseInput,
  },
  setup(props) {
    const quantity_ = shallowRef(props.quantity);
    return { quantity_ };
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
  methods: {
    changeLineItemQuantity() {
      console.log('change line item quantity');
      // return this.updateMyCart([
      //   {
      //     changeLineItemQuantity: {
      //       lineItemId: this.lineItemId,
      //       quantity: this.form.quantity,
      //     },
      //   },
      // ]);
    },
    removeLineItem() {
      console.log('remove line item');
      // return this.updateMyCart([
      //   {
      //     removeLineItem: {
      //       lineItemId: this.lineItemId,
      //     },
      //   },
      // ]);
    },
    increment() {
      this.quantity_ += 1;
    },
    decrement() {
      if (this.quantity_ > 1) {
        this.quantity_ -= 1;
      } else {
        this.removeLineItem();
      }
    },
  },
};
