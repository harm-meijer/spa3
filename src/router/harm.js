//import Home from '../views/Shop/Root/Home/Home.vue';
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer.vue';
import Products from '../views/Shop/Root/Products/Products.vue';
import Product from '../views/Shop/Root/Product/Product.vue';
export default [
  {
    path: 'products/:categorySlug/:page?',
    name: 'Products',
    components: {
      default: Products,
      header: Header,
      // footer: null,
    },
  },
  {
    path: 'product/:productSlug/:sku',
    name: 'Product',
    components: {
      default: Product,
      header: Header,
      footer: Footer,
    },
  },
];
