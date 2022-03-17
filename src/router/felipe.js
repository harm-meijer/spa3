import Header from 'containers/components/Header/Header.vue';
import Footer from 'presentation/Footer/Footer.vue';
import Cart from 'presentation/CartDetail/CartDetail.vue';
import Home from 'containers/views/Shop/Root/Home/Home.vue';
import StoreLocator from 'containers/views/Shop/Root/Stores/StoreLocator.vue';
export default [
  {
    path: 'cart',
    name: 'cart',
    components: {
      default: Cart,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: '',
    name: 'home',
    components: {
      default: Home,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'stores',
    name: 'stores',
    components: {
      default: StoreLocator,
      header: Header,
      footer: Footer,
    },
  },
];
