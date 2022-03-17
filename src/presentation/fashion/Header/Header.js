// import CategoriesMenu from "../CategoriesMenu";
import LoginButton from './LoginButton/LoginButton.vue';
import CustomerTools from 'containers/components/CustomerTools/CustomerTools.vue';
// import LocationSelector from "../LocationSelector/LocationSelector.vue";

import Selector from './Selector/Selector.vue';
import CategoriesMenu from 'containers/components/Header/CategoriesMenu';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import useSearch from 'hooks/useSearch';
import useLocale from 'hooks/useLocale';
import useLocation from 'hooks/useLocation';
import useCart from 'hooks/useCart';
import useMiniCart from 'hooks/useMinicart';
import sunriseConfig from '../../../../sunrise.config';

export default {
  name: 'HeaderPresentation',
  setup() {
    const locale = useLocale();
    const location = useLocation();
    const { cart, exist } = useCart();
    const { search, setSearch } = useSearch();
    const totalCartItems = computed(() =>
      exist.value && cart.value
        ? cart.value.lineItems
            .map(({ quantity }) => quantity)
            .reduce((sum, q) => sum + q, 0)
        : 0
    );
    const locations = Object.keys(sunriseConfig.countries);
    const locales = Object.keys(sunriseConfig.languages);
    const miniCart = useMiniCart();

    //@todo: what do we do with this one? Do we have to get this every time?
    const { t } = useI18n();
    const searchOpen = ref(false);
    // const mobileMenuOpen = ref(false);

    const toggleSearch = () => {
      searchOpen.value = !searchOpen.value;
    };
    const doSearch = () => {
      toggleSearch();
      setSearch(search.value);
    };

    return {
      t,
      doSearch,
      toggleSearch,
      searchOpen,
      ...locale,
      miniCart,
      locales,
      ...location,
      locations,
      search,
      setSearch,
      totalCartItems,
      showLocationChange: true, //@todo: implement this one
      totalShoppingCartItems: 0, //@todo: need this one??
    };
  },
  components: {
    Selector,
    CategoriesMenu,
    LoginButton,
    CustomerTools,
  },
};
