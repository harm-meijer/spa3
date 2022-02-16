import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import { move } from '../../../../../lib';
// import { ALL } from '../../../../constants';

export default {
  name: 'Products',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const sku = computed(() => route.params.sku);
    const { total, products, loading, error } = useProducts(
      {
        sku,
      }
    );
    const changeSKU = (sku) => {
      move(router, route, { ...route.params, sku }, 'push');
    };
    return {
      products,
      total,
      loading,
      error,
      changeSKU,
    };
  },
};
