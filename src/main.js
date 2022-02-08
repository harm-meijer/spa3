// import { createApp, provide, h } from 'vue';
import { createApp, h } from 'vue';

// import { DefaultApolloClient } from '@vue/apollo-composable';
// import App from './App.vue';
// import { apolloClient } from './apollo';
import router from './router';

import i18n from './i18n'

const app = createApp({
  render: () =>
    h(
      <>
        <router-view name="header" />
        <router-view />
        <router-view name="footer" />
      </>
    ),
}).use(i18n).use(router);

app.mount('#app');
