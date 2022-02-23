/* eslint-disable no-unused-vars */
//@todo: remove this eslint disable and see what we need
//@todo: split into presentation and container
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner.vue';
// import ProductFilter from '../ProductFilter/ProductFilter.vue';
// import ProductThumbnail from '../../common/ProductThumbnail/ProductThumbnail.vue';
// import TopBar from '../TopBar/TopBar.vue';
import Pagination from 'presentation/components/Pagination/Pagination.vue';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import ProductThumbnail from './ProductThumbnail/ProductThumbnail.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProductList',
  components: {
    Spinner,
    ProductThumbnail,
    Pagination,
    // ProductFilter,
    // TopBar,
  },
  props: {
    addToCart: {
      type: Function,
      required: true,
    },
    formatProduct: {
      type: Function,
      required: true,
    },
    setPage: {
      type: Function,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object,
      required: false,
    },
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
};
