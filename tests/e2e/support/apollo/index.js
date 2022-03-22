import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
} from '@apollo/client/core';
import fetch from './auth';
const config = {
  ct: {
    auth: {
      host: Cypress.env('VUE_APP_CT_AUTH_HOST'),
      projectKey: Cypress.env('VUE_APP_CT_PROJECT_KEY'),
      credentials: {
        clientId: Cypress.env('VUE_APP_CT_CLIENT_ID'),
        clientSecret: Cypress.env(
          'VUE_APP_CT_CLIENT_SECRET'
        ),
      },
      scope: Cypress.env('VUE_APP_CT_SCOPE'),
    },
    api: Cypress.env('VUE_APP_CT_API_HOST'),
  },
};
const cache = new InMemoryCache({
  //getting default id is broken
  dataIdFromObject(responseObject) {
    if (responseObject.__typename === 'Me') {
      return 'activeCart' in responseObject
        ? 'activeCart'
        : 'orders';
    }
    return defaultDataIdFromObject(responseObject);
  },
});
const httpLink = createHttpLink({
  uri: `${config.ct.api}/${config.ct.auth.projectKey}/graphql`,
  fetch,
});
const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});
export default apolloClient;
