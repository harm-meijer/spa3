//import Home from '../views/Shop/Root/Home/Home.vue';
import Header from 'containers/components/Header/Header.vue';
import Footer from 'presentation/Footer/Footer.vue';
import Products from 'containers/views/Shop/Root/Products/Products.vue';
import Product from 'containers/views/Shop/Root/Product/Product.vue';
import Checkout from 'containers/views/Shop/Root/Checkout/Checkout.vue';
export default [
  {
    path: 'products/:categorySlug/:page?',
    name: 'products',
    components: {
      default: Products,
      header: Header,
      // footer: null,
    },
  },
  {
    path: 'product/:productSlug/:sku',
    name: 'product',
    components: {
      default: Product,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'checkout',
    name: 'checkout',
    // meta: { requiresCart },
    components: {
      default: Checkout,
      header: Header,
      footer: Footer,
    },
  },
];
