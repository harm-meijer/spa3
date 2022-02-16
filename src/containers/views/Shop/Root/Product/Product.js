import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import { move } from '../../../../../lib';
import ProductPresentation from 'presentation/Product/Product.vue';
// import { ALL } from '../../../../constants';
const skus = [
  'M0E20000000EAT6',
  'M0E20000000EATA',
  'M0E20000000DX1Y',
  'M0E20000000DX2E',
];
export default {
  name: 'Product',
  components: {
    ProductPresentation,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const sku = computed(() => route.params.sku);
    const { total, products, loading, error } = useProducts(
      {
        sku,
        expand: { variants: true },
      }
    );
    const changeSKU = (sku) => {
      move(router, route, { ...route.params, sku }, 'push');
    };
    return {
      products,
      total,
      loading,
      error,
      changeSKU,
      sku,
      skus,
    };
  },
};