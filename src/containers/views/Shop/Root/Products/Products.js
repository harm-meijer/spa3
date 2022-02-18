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
    const setCategory = (categorySlug) =>
      move(
        router,
        route,
        {
          ...route.params,
          categorySlug,
        },
        'push'
      );

    const {
      total,
      products,
      loading,
      error,
      sort,
      setSort,
    } = useProducts();
    return {
      setPage,
      products,
      total,
      loading,
      error,
      sort,
      setSort,
      setCategory,
      categories: ['all', 'men', 'women'],
    };
  },
};
