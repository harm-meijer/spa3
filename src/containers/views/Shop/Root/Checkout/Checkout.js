import useCart from 'hooks/useCart';
// import CartDetail from 'presentation/CartDetail/CartDetail.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';

export default {
  name: 'Cart',
  components: {
    // CartDetail,
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
