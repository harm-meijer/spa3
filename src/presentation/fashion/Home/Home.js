import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Banner from 'presentation/Banner/Banner.vue';
import useLocation from '../../../../composition/useLocation';

export default {
  name: 'Home',
  components: { Banner },

  setup() {
    const { location } = useLocation();
    const { t, n } = useI18n();
    const freeShippingValue = computed(() => {
      //@todo: works in BaseMoney but not here, why?
      // return n(100, 'currency', location.value);
      n;
      location;
      return '100';
    });
    return {
      t,
      freeShippingValue,
    };
  },
};
