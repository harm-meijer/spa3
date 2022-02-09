import { watch } from 'vue';
import useCart from '../../../../../composition/useCart';
import useLocale from '../../../../../composition/useLocale';

export default {
  name: 'Cart',
  setup() {
    const { locale } = useLocale();
    const { cart, loading, error } = useCart({
      locale: locale.value,
    });
    return {
      cart,
      loading,
      error,
    };
  },
};
