import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer.vue';
import Cart from '../views/Shop/Root/Cart/Cart.vue';
import Home from '../views/Shop/Root/Home/Home.vue';
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
    path: 'home',
    name: 'home',
    components: {
      default: Home,
      header: Header,
      footer: Footer,
    },
  },
];
