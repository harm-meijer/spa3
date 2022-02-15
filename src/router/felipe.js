import Header from 'containers/components/Header/Header.vue';
import Footer from 'containers/components/Footer.vue';
import Cart from 'containers/views/Shop/Root/Cart/Cart.vue';
import Home from 'containers/views/Shop/Root/Home/Home.vue';
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
