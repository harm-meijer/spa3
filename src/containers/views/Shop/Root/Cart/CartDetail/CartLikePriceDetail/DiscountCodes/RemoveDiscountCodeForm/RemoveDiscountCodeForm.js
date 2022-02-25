//removeDiscountCode
export default {
  props: {
    codeId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { removeDiscount: rd } = props.cartActions;
    const removeDiscount = () => rd(props.codeId);
    return { removeDiscount };
  },
};
