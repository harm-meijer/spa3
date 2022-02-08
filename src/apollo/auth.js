import { encode } from 'js-base64';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {
  createGroup,
  createPromiseSessionCache,
} from './group';

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
    .then(saveToken);
};
const group = createGroup(createPromiseSessionCache());
//@todo: on 404 error make sure to try and get token with
//  refreshtoken and if that doesn't work reset and re get token
export default group((auth) => getToken(auth));
