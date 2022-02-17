import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import { apolloClient } from './apollo';
import router from './router';
import VueGoogleMaps from '@fawmi/vue-google-maps';
//import useLocale from '../composition/useLocale';
import i18n from './i18n';

//const { locale } = useLocale();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    },
  })
  .use(i18n)
  .use(router);

app.mount('#app');
