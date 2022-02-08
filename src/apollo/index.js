import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import config from '../../sunrise.config';
import auth from './auth';
const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: `${config.ct.api}/${config.ct.auth.projectKey}/graphql`,
});
const authLink = setContext((_, { headers }) => {
  return auth({
    id: config.ct.auth.credentials.clientId,
    secret: config.ct.auth.credentials.clientSecret,
    scope: config.ct.auth.scope,
    projectKey: config.ct.auth.projectKey,
    authUrl: config.ct.auth.host,
  }).then((token) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));
});
//@todo: on 404 try to get token using refreshtoken
//  if that fails then remove all token info and get
//  a fresh token
//@todo: need to get a token to log in as specific user
export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});
