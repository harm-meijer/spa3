import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { apolloClient, cache } from '../../../apollo';
import { loginToken } from '../../../apollo/auth';

export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});
const login = (email, password) =>
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
const CUSTOMER_ID = 'CUSTOMER_ID';
const customer = ref(localStorage.getItem(CUSTOMER_ID));
export default {
  name: 'CustomerTools',
  setup() {
    const showLoggedIn = computed(() =>
      Boolean(customer.value)
    );
    const tools = {
      login,
      showLoggedIn,
    };
    return { tools };
  },
};
