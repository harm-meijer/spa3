import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import useCartMutation, {
  addLineItem,
} from 'hooks/useCartMutation';
import { move } from '../../../../../lib';
import ProductList from 'presentation/ProductList/ProductList.vue';
import { DEFAULT_PAGE_SIZE } from '../../../../../constants';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

export default {
  name: 'Products',
  components: {
    ProductList,
    // Breadcrumb,
    // ProductQuickView,
    // AddToShoppingList
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
    const page = computed(() =>
      Number(route.params.page || 1)
    );
    const {
      total,
      products,
      loading,
      error,
      // sort,
      // setSort,
    } = useProducts();
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const formatProduct = (product) => ({
      ...product,
      ...product.masterVariant,
    });
    const { mutateCart } = useCartMutation();
    const addToCart = (sku, quantity = 1) =>
      mutateCart(addLineItem(sku, quantity));

    return {
      addToCart,
      formatProduct,
      // setSearch,
      // search,
      setPage,
      page,
      pageSize: Number(
        process.env.VUE_APP_PAGE_SIZE || DEFAULT_PAGE_SIZE
      ),
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
