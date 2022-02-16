import useCart from 'hooks/useCart';
import { useI18n } from 'vue-i18n';
//resolve-path could be scr/presentation/fashion
// import PresentationComponent from 'resolve-path/Cart/Cart.vue';

export default {
  name: 'Cart',
  // components: {
  //   PresentationComonent
  // },
  setup() {
    const { cart, loading, error } = useCart();
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return {
      cart,
      loading,
      error,
      t,
    };
  },
};
