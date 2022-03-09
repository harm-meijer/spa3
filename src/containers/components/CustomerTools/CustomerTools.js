import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apolloClient, cache } from '../../../apollo';
import {
  loginToken,
  logout as lo,
} from '../../../apollo/auth';
import { CUSTOMER } from '../../../constants';

export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});
const signup = (form) => {
  return apolloClient
    .mutate({
      mutation: gql`
        mutation customerSignMeUp(
          $draft: CustomerSignMeUpDraft!
        ) {
          customerSignMeUp(draft: $draft) {
            customer {
              id
              firstName
              lastName
              email
              customerNumber
            }
          }
        }
      `,
      variables: {
        draft: {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        },
      },
    })
    .then((data) => {
      loginToken(form.email, form.password);
      return data;
    })
    .then((result) => {
      const c = result.data.customerSignMeUp.customer;
      localStorage.setItem(CUSTOMER, JSON.stringify(c));
      customer.value = c;
      () => cache.reset();
      return result;
    });
};
const li = (email, password) =>
  apolloClient
    .mutate({
      mutation: gql`
        mutation customerSignMeIn(
          $draft: CustomerSignMeInDraft!
        ) {
          customerSignMeIn(draft: $draft) {
            customer {
              id
              firstName
              lastName
              email
              customerNumber
            }
          }
        }
      `,
      variables: loginVars(email, password),
    })
    .then((data) => {
      loginToken(email, password);
      return data;
    })
    .then((result) => {
      const c = result.data.customerSignMeIn.customer;
      localStorage.setItem(CUSTOMER, JSON.stringify(c));
      customer.value = c;
      () => cache.reset();
      return result;
    });
const customer = ref(
  JSON.parse(localStorage.getItem(CUSTOMER))
);
export default {
  name: 'CustomerTools',
  setup() {
    const router = useRouter();
    const showLoggedIn = computed(() =>
      Boolean(customer.value)
    );
    const logout = () => {
      lo();
      customer.value = null;
      cache.reset();
      router.push({ name: 'login' });
    };
    const login = (email, password) =>
      li(email, password).then(() =>
        router.push({ name: 'user' })
      );
    const tools = {
      login,
      signup,
      showLoggedIn,
      customer,
      logout,
    };
    return { tools };
  },
};
