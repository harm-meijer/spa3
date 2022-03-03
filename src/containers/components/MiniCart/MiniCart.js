//@todo: we need this scrollbar for correct style
// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import useCart from 'hooks/useCart';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import useMiniCart from 'hooks/useMinicart';
import MiniCartPresentation from 'presentation/Header/MiniCart/MiniCart.vue';

export default {
  name: 'MiniCart',
  components: {
    CartLike,
    MiniCartPresentation,
  },
  setup() {
    const { open, close, isOpen } = useMiniCart();
    const { cart, loading, error } = useCart();
    return {
      cart,
      loading,
      error,
      open,
      close,
      isOpen,
    };
  },
};
