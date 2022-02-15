import { encode } from 'js-base64';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {
  createGroup,
  createPromiseSessionCache,
} from './group';
import config from '../../sunrise.config';

const createAuth = (au) => encode(`${au.id}:${au.secret}`);
const saveToken = ({ access_token, refresh_token }) => {
  access_token &&
    localStorage.setItem(ACCESS_TOKEN, access_token);
  refresh_token &&
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  return access_token;
};
export const resetToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
const getToken = (au) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    return Promise.resolve(token);
  }
  const auth = createAuth(au);
  const scope = encodeURI(au.scope);
  return fetch(
    `${au.authUrl}/oauth/${au.projectKey}/anonymous/token`,
    {
      headers: {
        authorization: `Basic ${auth}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&scope=${scope}`,
      method: 'POST',
    }
  )
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(response)
    )
    .then(saveToken)
    .catch(handleError);
};
const group = createGroup(createPromiseSessionCache());
const getTokenGrouped = group((auth) => getToken(auth));
export const handleError = (error) => {
  return Promise.reject(error);
};
export const fetchWithToken = (url, options) => {
  return getTokenGrouped({
    id: config.ct.auth.credentials.clientId,
    secret: config.ct.auth.credentials.clientSecret,
    scope: config.ct.auth.scope,
    projectKey: config.ct.auth.projectKey,
    authUrl: config.ct.auth.host,
  }).then((token) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        return refreshToken({
          id: config.ct.auth.credentials.clientId,
          secret: config.ct.auth.credentials.clientSecret,
          scope: config.ct.auth.scope,
          projectKey: config.ct.auth.projectKey,
          authUrl: config.ct.auth.host,
        }).then(() => {
          return fetchWithToken(url, options);
        });
      }
      return response;
    });
  }, handleError);
};
const refreshToken = group((au) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const auth = createAuth(au);
  return fetch(`${au.authUrl}/oauth/token`, {
    headers: {
      authorization: `Basic ${auth}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    method: 'POST',
  })
    .then((response) => response.json())
    .then((token) => {
      saveToken(token);
    });
});
export default fetchWithToken;
