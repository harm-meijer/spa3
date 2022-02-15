import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
} from '@apollo/client/core';
import config from '../../sunrise.config';
import fetch from './auth';
export const cache = new InMemoryCache({
  //getting default id is broken
  dataIdFromObject(responseObject) {
    if (responseObject?.scopedPrice?.country) {
      console.log('variable:', responseObject.scopedPrice);
      console.log(
        'key:',
        defaultDataIdFromObject(responseObject)
      );
      // return `${defaultDataIdFromObject(
      //   responseObject
      // )}:${JSON.stringify(responseObject.scopedPrice)}`;
    }
    return defaultDataIdFromObject(responseObject);
  },
});
const httpLink = createHttpLink({
  uri: `${config.ct.api}/${config.ct.auth.projectKey}/graphql`,
  fetch,
});
export const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});
