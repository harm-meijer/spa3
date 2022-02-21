import useLocale from 'hooks/useLocale';
import useLocation from 'hooks/useLocation';
import useCart from 'hooks/useCart';
import HeaderPresentation from 'presentation/Header/Header.vue';
import { computed } from 'vue';
import useSearch from 'hooks/useSearch';
import sunriseConfig from '../../../../sunrise.config';
export default {
  components: {
    HeaderPresentation,
  },
  setup() {
    const locale = useLocale();
    const location = useLocation();
    const { cart, exist } = useCart({
      expand: { minimum: true },
    });
    const search = useSearch();
    const total = computed(() =>
      exist.value && cart.value
        ? cart.value.lineItems
            .map(({ quantity }) => quantity)
            .reduce((sum, q) => sum + q, 0)
        : 0
    );
    const locations = Object.keys(sunriseConfig.countries);
    const locales = Object.keys(sunriseConfig.languages);
    return {
      ...locale,
      locales,
      ...location,
      locations,
      ...search,
      total,
    };
  },
};
