import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from 'hooks/useProducts';
import { move } from '../../../../../lib';
import useStore from 'hooks/useStore';
import PageProductDetail from './PageProductDetail/PageProductDetail.vue';
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
    PageProductDetail,
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
    const product = computed(() => products.value?.[0]);
    const allVariants = computed(() =>
      product.value
        ? [product.value.masterVariant]
            .concat(product.value.variants)
            .map((p) => ({
              name: product.value.name,
              slug: product.value.slug,
              ...p,
            }))
        : null
    );
    const currentVariant = computed(() =>
      allVariants.value
        ? allVariants.value.find(
            ({ sku: c }) => sku.value === c
          )
        : null
    );

    const changeSKU = (sku) => {
      move(router, route, { ...route.params, sku }, 'push');
    };
    const { store, setStore } = useStore();
    return {
      allVariants,
      currentVariant,
      store,
      setStore,
      product,
      total,
      loading,
      error,
      changeSKU,
      sku,
      skus,
    };
  },
};
