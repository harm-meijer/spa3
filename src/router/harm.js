import Home from '../views/Home/Home.vue';
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer.vue';
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
];
