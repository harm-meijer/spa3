// import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';
// import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';
import ProductInfo from './ProductInfo/ProductInfo.vue';

export default {
  name: 'PageProductDetail',
  props: {
    allVariants: {
      type: Array,
      required: false,
    },
    currentVariant: {
      type: Object,
      required: false,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    showAddToShoppingList: false,
    productSku: null,
  }),
  methods: {
    openAddToShoppingList() {
      this.showAddToShoppingList = true;
    },
    closeAddToShoppingList() {
      this.showAddToShoppingList = false;
    },
  },
  components: {
    // Breadcrumb,
    ProductInfo,
    // AddToShoppingList
  },
};
