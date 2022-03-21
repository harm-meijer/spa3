import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useProducts from './useProducts';

function useProductTools(expand = false) {
  const route = useRoute();
  const sku = computed(() => route.params.sku);
  const { total, products, loading, error } = useProducts({
    sku,
    expand: expand ? { variants: true } : {},
  });
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

  return {
    total,
    products,
    loading,
    error,
    allVariants,
    sku,
    currentVariant,
  };
}
export default useProductTools;
