import { useRoute, useRouter } from 'vue-router';
import useProducts from '../../../../../composition/useProducts';
import { move } from '../../../../lib';
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
    };
  },
};
