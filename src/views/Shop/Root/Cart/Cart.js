import useCart from '../../../../../composition/useCart';
import useLocale from '../../../../../composition/useLocale';
import { getValue } from '../../../../lib';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Cart',
  setup() {
    const { locale } = useLocale();
    const { cart, loading, error } = useCart({
      locale: getValue(locale),
    });
    const t = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return {
      cart,
      loading,
      error,
      ...t,
    };
  },
};
