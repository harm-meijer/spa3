import Home from '../views/Home.vue';
import About from '../views/About/About.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default [
  {
    path: '/home',
    name: 'Home',
    components: {
      header: Header,
      footer: Footer,
      default: Home,
    },
  },
  {
    path: '/about',
    name: 'About',
    components: {
      header: Header,
      footer: Footer,
      default: About,
    },
  },
];
