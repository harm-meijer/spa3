import useLocale from 'hooks/useLocale';
import useLocation from 'hooks/useLocation';
import useCart from 'hooks/useCart';
import { computed } from 'vue';
export default {
  setup() {
    const locale = useLocale();
    const location = useLocation();
    const { cart, exist } = useCart({
      expand: { minimum: true },
    });
    const total = computed(() =>
      exist.value && cart.value
        ? cart.value.lineItems
            .map(({ quantity }) => quantity)
            .reduce((sum, q) => sum + q, 0)
        : 0
    );

    return { ...locale, ...location, total };
  },
};
