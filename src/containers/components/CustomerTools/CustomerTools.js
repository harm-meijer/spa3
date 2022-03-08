import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apolloClient, cache } from '../../../apollo';
import {
  loginToken,
  logout as lo,
} from '../../../apollo/auth';
import { CUSTOMER_ID } from '../../../constants';

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
      const id = result.data.customerSignMeUp.customer.id;
      localStorage.setItem(CUSTOMER_ID, id);
      customer.value = id;
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
      const id = result.data.customerSignMeIn.customer.id;
      localStorage.setItem(CUSTOMER_ID, id);
      customer.value = id;
      () => cache.reset();
      return result;
    });
const customer = ref(localStorage.getItem(CUSTOMER_ID));
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
      logout,
    };
    return { tools };
  },
};
