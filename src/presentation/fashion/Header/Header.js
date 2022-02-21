// import CategoriesMenu from "../CategoriesMenu";
// import LoginButton from "../LoginButton/LoginButton.vue";
// import LocationSelector from "../LocationSelector/LocationSelector.vue";
// import MiniCart from "../MiniCart/MiniCart.vue";

import Selector from './Selector/Selector.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'HeaderPresentation',
  setup() {
    //@todo: what do we do with this one? Do we have to get this every time?
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return { t };
  },
  components: {
    Selector,
  },
  data() {
    return {
      searchOpen: false,
      mobileMenuOpen: false,
    };
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
    cart: {
      type: Object,
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
  // components: {
  //   CategoriesMenu,
  //   LoginButton,
  //   MiniCart,
  //   LocationSelector,
  // },
  // data() {
  //   return {
  //     searchText: this.$route.query.q || '',
  //     mobileMenuOpen: false,
  //     searchOpen: false,
  //   };
  // },
  // setup() {
  //   const { shoppingLists } = inject(SHOPPING_LIST);
  //   const totalShoppingCartItems = computed(() => {
  //     return (shoppingLists.value || []).reduce(
  //       (total, list) =>
  //         list.lineItems.reduce(
  //           (total, { quantity }) => total + quantity,
  //           total
  //         ),
  //       0
  //     );
  //   });
  //   return {
  //     totalShoppingCartItems,
  //   };
  // },
  // computed: {
  //   totalCartItems() {
  //     return this.$store.state.cartItems;
  //   },
  //   showLocationChange() {
  //     return !this.totalCartItems;
  //   },
  // },
  methods: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    doSearch() {
      this.toggleSearch();
      this.setSearch(this.search);
    },
  },
};
