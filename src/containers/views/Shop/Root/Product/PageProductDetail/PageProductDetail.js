//@todo: add to shopping list (breadcrumb can go)
// import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';
// import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';
import { ref } from 'vue';
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
    cartActions: {
      type: Object,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  setup() {
    const showAddToShoppingList = ref(false);
    const productSku = ref(null);
    const openAddToShoppingList = () => {
      showAddToShoppingList.value = true;
    };
    const closeAddToShoppingList = () => {
      showAddToShoppingList.value = false;
    };
    return {
      openAddToShoppingList,
      closeAddToShoppingList,
      productSku,
    };
  },
  components: {
    // Breadcrumb,
    ProductInfo,
    // AddToShoppingList
  },
};
