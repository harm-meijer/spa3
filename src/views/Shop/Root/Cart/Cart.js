import useCart from '../../../../../composition/useCart';
import useLocale from '../../../../../composition/useLocale';
import { getValue } from '../../../../lib';

export default {
  name: 'Cart',
  setup() {
    const { locale } = useLocale();
    const { cart, loading, error } = useCart({
      locale: getValue(locale),
    });
    return {
      cart,
      loading,
      error,
    };
  },
};
