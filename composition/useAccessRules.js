import { computed } from 'vue';
import config from '../sunrise.config';
import useCart from './useCart';

function useAccessRules() {
  const { cart } = useCart();
  const showStoreSelector = computed(() => {
    /**
     * To get channels the scope view_products is needed
     * This is a security risk because all clients can see unpublished products
     * If you want to select stores then you have to use a proxy or BFF or
     * run the risk of clients hacking access to unpublished products
     **/
    return (
      cart.value === null &&
      config.ct.auth.scope.includes('view_products')
    );
  });
  const showLocationSelector = computed(
    () => cart.value === null
  );
  const showReturnItemButton = computed(() => {
    /**
     * To return an item you need to update the order, there is no update my order scope
     * so to return an item you need access to all orders, including orders that are not
     * yours. So to return an item you need to implement it with proxy or BFF that
     * checks ownership of the order
     */
    return config.ct.auth.scope.includes('manage_orders');
  });
  return {
    showStoreSelector,
    showLocationSelector,
    showReturnItemButton,
  };
}
export default useAccessRules;
