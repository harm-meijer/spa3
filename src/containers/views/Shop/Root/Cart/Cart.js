import useCart from 'hooks/useCart';
import { computed } from 'vue';
import { useCartActions } from '../../../../../../composition/useCartMutation';
import CartDetail from './CartDetail/CartDetail.vue';
//resolve-path could be scr/presentation/fashion
// import PresentationComponent from 'resolve-path/Cart/Cart.vue';

export default {
  name: 'Cart',
  components: {
    CartDetail,
  },
  setup() {
    const { cart, loading, error } = useCart({
      expand: { lineItems: true },
    });
    const cartNotEmpty = computed(() =>
      Boolean(
        cart.value && Boolean(cart.value?.lineItems?.length)
      )
    );
    const cartActions = useCartActions();
    return {
      cart,
      loading,
      error,
      cartNotEmpty,
      cartActions,
    };
  },
};
