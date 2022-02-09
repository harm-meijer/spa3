import Home from '../views/Shop/Root/Home/Home.vue';
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer.vue';
import Products from '../views/Shop/Root/Products/Products.vue';
export default [
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
    path: 'products/:categorySlug/:page?',
    name: 'Products',
    components: {
      default: Products,
      header: Header,
      // footer: null,
    },
  },
];
