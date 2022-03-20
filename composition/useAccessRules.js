import { computed } from 'vue';
import config from '../sunrise.config';
import useCart from './useCart';

function useAccessRules() {
  const { cart } = useCart();
  console.log('cart:', cart.value);
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
  return { showStoreSelector, showLocationSelector };
}
export default useAccessRules;
