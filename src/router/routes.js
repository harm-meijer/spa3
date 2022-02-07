import Home from '../views/Home.vue';
import About from '../views/About/About.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Root from '../views/Shop/Root/Root.vue';

import config from '../../sunrise.config';
export default [
  {
    path: `/:country(${Object.keys(config.countries).join(
      '|'
    )})?/:locale(${Object.keys(config.languages).join(
      '|'
    )})?`,
    name: 'root',
    component: Root,
    // children: [],
  },
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
