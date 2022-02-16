import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import { ALL } from '../src/constants';
import useProducts from './ct/useProducts';
import usePaging from './usePaging';
//vue specific useProducts
export const useSorts = () => {
  const route = useRoute();
  const router = useRouter();
  const sorts = computed(() => {
    return route?.query?.sort === 'newest'
      ? ['lastModifiedAt desc']
      : null;
  });
  const setSort = (sort) =>
    router.push({
      ...route,
      query: {
        ...route.query,
        sort,
      },
    });
  return { sorts, setSort };
};

export default ({ expand }) => {
  const route = useRoute();
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const categorySlug = computed(() =>
    route.params.categorySlug === ALL
      ? null
      : route.params.categorySlug
  );
  const sku = computed(() => route?.params?.sku);
  const page = computed(() => route.params.page || 1);
  const { limit, offset } = usePaging(page);
  const { sorts, setSort } = useSorts();

  const { total, products, loading, error } = useProducts({
    limit,
    offset,
    locale,
    currency,
    sorts,
    country: location,
    categorySlug,
    sku,
    expand,
  });
  return {
    total,
    products,
    loading,
    error,
    sorts,
    setSort,
  };
};
