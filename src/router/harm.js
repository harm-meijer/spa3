import Header from 'containers/components/Header/Header.vue';
import Footer from 'presentation/Footer/Footer.vue';
import Products from 'containers/views/Shop/Root/Products/Products.vue';
import Product from 'containers/views/Shop/Root/Product/Product.vue';
import Checkout from 'containers/views/Shop/Root/Checkout/Checkout.vue';
import Login from 'containers/views/Shop/Root/Login/Login.vue';
import User from 'containers/views/Shop/Root/User/User.vue';
import TabDashboard from 'containers/views/Shop/Root/User/TabDashboard/TabDashboard.vue';
import TabAccountDetails from 'containers/views/Shop/Root/User/TabAccountDetails/TabAccountDetails.vue';
import TabChangePassword from 'containers/views/Shop/Root/User/TabChangePassword/TabChangePassword.vue';
import ForgotPassword from 'containers/views/ForgotPassword/ForgotPassword.vue';
import ResetPassword from 'containers/views/Shop/Root/User/ResetPassword/ResetPassword.vue';
import TabOrderList from 'containers/views/Shop/Root/User/TabOrderList/TabOrderList.vue';
import TabOrderDetail from 'containers/views/Shop/Root/User/TabOrderDetail/TabOrderDetail.vue';
import TabReturn from 'containers/views/Shop/Root/User/TabReturn/TabReturn.vue';
const requiresAuth = true;
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
  {
    path: 'login',
    name: 'login',
    components: {
      default: Login,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    components: {
      default: ForgotPassword,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'reset-password/:token',
    name: 'reset-password',
    components: {
      default: ResetPassword,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'user',
    meta: { requiresAuth },
    components: {
      default: User,
      header: Header,
      footer: Footer,
    },
    children: [
      {
        path: 'dashboard',
        alias: '',
        name: 'user',
        component: TabDashboard,
      },
      {
        path: 'order/:id',
        name: 'order',
        component: TabOrderDetail,
      },
      {
        path: 'return/:id',
        name: 'return',
        component: TabReturn,
      },
      {
        path: 'orders/:page?',
        name: 'orders',
        component: TabOrderList,
      },
      {
        path: 'account',
        name: 'account',
        component: TabAccountDetails,
      },
      {
        path: 'changepassword',
        name: 'changepassword',
        component: TabChangePassword,
      },
    ],
  },
];
