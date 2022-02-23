// import CategoriesMenu from "../CategoriesMenu";
// import LoginButton from "../LoginButton/LoginButton.vue";
// import LocationSelector from "../LocationSelector/LocationSelector.vue";
// import MiniCart from "../MiniCart/MiniCart.vue";

import Selector from './Selector/Selector.vue';
import CategoriesMenu from 'containers/components/Header/CategoriesMenu';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

export default {
  name: 'HeaderPresentation',
  setup(props) {
    //@todo: what do we do with this one? Do we have to get this every time?
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const q = ref(props.search);
    const searchOpen = ref(false);
    // const mobileMenuOpen = ref(false);

    const toggleSearch = () => {
      searchOpen.value = !searchOpen.value;
    };
    const doSearch = () => {
      toggleSearch();
      props.setSearch(q.value);
    };

    return { t, q, doSearch, toggleSearch, searchOpen };
  },
  components: {
    Selector,
    CategoriesMenu,
  },
  props: {
    shoppingLists: {
      type: Array,
      required: false,
    },
    totalShoppingCartItems: {
      type: Number,
      required: false,
    },
    totalCartItems: {
      type: Number,
      required: false,
    },
    showLocationChange: {
      type: Boolean,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
    setSearch: {
      type: Function,
      required: true,
    },
    toggleMobileMenu: {
      type: Function,
      required: true,
    },
    toggleMiniCart: {
      type: Function,
      required: true,
    },
    openMiniCart: {
      type: Function,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    setLocation: {
      type: Function,
      required: true,
    },
    locations: {
      type: Array,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    setLocale: {
      type: Function,
      required: true,
    },
    locales: {
      type: Array,
      required: true,
    },
  },
};
