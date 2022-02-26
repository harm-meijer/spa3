//removeDiscountCode
export default {
  props: {
    codeId: {
      type: String,
      required: true,
    },
    cartLike: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { removeDiscount: rd } = props.cartLike.cartTools;
    const removeDiscount = () => rd(props.codeId);
    return { removeDiscount };
  },
};
