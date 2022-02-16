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
    const setPage = (page) =>
      move(
        router,
        route,
        {
          ...route.params,
          page,
        },
        'push'
      );
    const page = computed(() => route.params.page || 1);
    const { total, products, loading, error } = useProducts(
      {
        page,
      }
    );
    return {
      setPage,
      products,
      total,
      loading,
      error,
    };
  },
};
