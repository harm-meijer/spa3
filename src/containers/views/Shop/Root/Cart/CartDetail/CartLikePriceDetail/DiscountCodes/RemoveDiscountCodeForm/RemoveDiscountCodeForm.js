import useCartMutation, {
  removeDiscountCode,
} from 'hooks/useCartMutation';

//removeDiscountCode
export default {
  props: {
    codeId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { mutateCart } = useCartMutation();
    const removeDiscount = () =>
      mutateCart(removeDiscountCode(props.codeId));
    return { removeDiscount };
  },
};
