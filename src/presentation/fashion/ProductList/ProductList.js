// import ProductFilter from '../ProductFilter/ProductFilter.vue';
// import TopBar from '../TopBar/TopBar.vue';
import Pagination from 'presentation/components/Pagination/Pagination.vue';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import ProductThumbnail from './ProductThumbnail/ProductThumbnail.vue';
import { useI18n } from 'vue-i18n';
import useProductTools from 'hooks/useProductTools';
import useCartMutation from 'hooks/useCartMutation';

export default {
  name: 'ProductList',
  components: {
    Spinner,
    ProductThumbnail,
    Pagination,
    // ProductFilter,
    // TopBar,
  },
  setup() {
    const { t } = useI18n();
    const { addLine } = useCartMutation();
    const {
      formatProduct,
      products,
      total,
      loading,
      page,
      setPage,
    } = useProductTools();
    const addToCart = (sku, quantity = 1) =>
      addLine(sku, quantity);

    return {
      t,
      formatProduct,
      products,
      total,
      loading,
      page,
      setPage,
      addToCart,
    };
  },
};
