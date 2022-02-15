import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import { ALL } from '../src/constants';
import useProducts from './ct/useProducts';
//vue specific useProducts
export const useSorts = () => {
  const route = useRoute();
  const router = useRouter();
  const sorts = computed(() => {
    if (route?.query?.sort) {
      return [route.query.sort];
    }
    return null;
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

export default () => {
  const route = useRoute();
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const categorySlug = computed(() =>
    route.params.categorySlug === ALL
      ? null
      : route.params.categorySlug
  );
  const page = computed(() => route.params.page || 1);
  const { sorts, setSort } = useSorts();

  const { total, products, loading, error } = useProducts({
    page,
    locale,
    currency,
    sorts,
    country: location,
    categorySlug,
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
