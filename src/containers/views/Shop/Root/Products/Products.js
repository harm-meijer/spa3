import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import { move } from '../../../../../lib';
import useSearch from 'hooks/useSearch';
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
    const { search, setSearch } = useSearch();
    const {
      total,
      products,
      loading,
      error,
      sort,
      setSort,
    } = useProducts();
    return {
      setSearch,
      search,
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
