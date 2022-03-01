import useCart from 'hooks/useCart';
// import CartDetail from 'presentation/CartDetail/CartDetail.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import PageCheckout from 'presentation/PageCheckout/PageCheckout.vue';
import { computed } from 'vue';
export default {
  name: 'Cart',
  components: {
    // CartDetail,
    CartLike,
    PageCheckout,
  },
  setup() {
    const { cart, loading, error } = useCart({
      expand: { lineItems: true },
    });
    const cartReady = computed(
      () => !loading.value && !error.value
    );

    return {
      cart,
      loading,
      error,
      cartReady,
    };
  },
};
