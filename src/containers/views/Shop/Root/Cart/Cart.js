import useCart from 'hooks/useCart';
import CartDetail from 'presentation/CartDetail/CartDetail.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
//resolve-path could be scr/presentation/fashion
// import PresentationComponent from 'resolve-path/Cart/Cart.vue';

export default {
  name: 'Cart',
  components: {
    CartDetail,
    CartLike,
  },
  setup() {
    const { cart, loading, error } = useCart({
      expand: { lineItems: true },
    });
    return {
      cart,
      loading,
      error,
    };
  },
};
