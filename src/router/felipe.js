import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer.vue';
import Cart from '../views/Shop/Root/Cart/Cart.vue';
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
];
