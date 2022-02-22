/* eslint-disable no-unused-vars */
//@todo: remove this eslint disable and see what we need
//@todo: split into presentation and container
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner.vue';
// import ProductFilter from '../ProductFilter/ProductFilter.vue';
// import ProductThumbnail from '../../common/ProductThumbnail/ProductThumbnail.vue';
// import TopBar from '../TopBar/TopBar.vue';
// import Pagination from '../../common/Pagination/Pagination.vue';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import ProductThumbnail from './ProductThumbnail/ProductThumbnail.vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import useSearch from 'hooks/useSearch';
import { move } from '../../../../../../lib';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProductList',
  components: {
    Spinner,
    ProductThumbnail,
    // Pagination,
    // ProductFilter,
    // TopBar,
  },
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const formatProduct = (product) => ({
      ...product,
      ...product.masterVariant,
    });

    return {
      formatProduct,
      // setSearch,
      // search,
      // setPage,
      products,
      total,
      loading,
      error,
      // sort,
      // setSort,
      // setCategory,
      // categories: ['all', 'men', 'women'],
      t,
    };
  },
};
