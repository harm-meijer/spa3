import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apolloClient, cache } from '../../../apollo';
import {
  loginToken,
  logout as lo,
} from '../../../apollo/auth';
import { CUSTOMER } from '../../../constants';
const saveCustomerState = (c) => {
  localStorage.setItem(CUSTOMER, JSON.stringify(c));
  customer.value = c;
  () => cache.reset();
};
export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});
const createResetToken = (email) =>
  apolloClient.mutate({
    mutation: gql`
      mutation createResetToken($email: String!) {
        customerCreatePasswordResetToken(email: $email) {
          value
        }
      }
    `,
    variables: {
      email,
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
              customerId: id
              firstName
              lastName
              email
              version
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
      return loginToken(form.email, form.password).then(
        () => data
      );
    })
    .then((result) => {
      saveCustomerState(
        result.data.customerSignMeUp.customer
      );
      return result;
    });
};
const updateUser = ({
  version,
  firstName,
  lastName,
  email,
}) =>
  apolloClient
    .mutate({
      mutation: gql`
        mutation updateMyCustomer(
          $actions: [MyCustomerUpdateAction!]!
          $version: Long!
        ) {
          updateMyCustomer(
            version: $version
            actions: $actions
          ) {
            customerId: id
            version
            email
            firstName
            lastName
            version
          }
        }
      `,
      variables: {
        version,
        actions: [
          { changeEmail: { email } },
          { setFirstName: { firstName } },
          { setLastName: { lastName } },
        ],
      },
    })
    .then((result) => {
      saveCustomerState(result.data.updateMyCustomer);
    });
const li = (email, password) =>
  apolloClient
    .mutate({
      mutation: gql`
        mutation customerSignMeIn(
          $draft: CustomerSignMeInDraft!
        ) {
          customerSignMeIn(draft: $draft) {
            customer {
              customerId: id
              firstName
              lastName
              email
              customerNumber
              version
            }
          }
        }
      `,
      variables: loginVars(email, password),
    })
    .then((data) => {
      return loginToken(email, password).then(() => data);
    })
    .then((result) => {
      saveCustomerState(
        result.data.customerSignMeIn.customer
      );
      cache.reset();
      return result;
    });
const updateMyCustomerPassword = ({
  currentPassword,
  newPassword,
}) => {
  return apolloClient
    .mutate({
      mutation: gql`
        mutation changePassword(
          $version: Long!
          $currentPassword: String!
          $newPassword: String!
        ) {
          customerChangeMyPassword(
            version: $version
            currentPassword: $currentPassword
            newPassword: $newPassword
          ) {
            customerId: id
            firstName
            lastName
            email
            customerNumber
            version
          }
        }
      `,
      variables: {
        version: customer.value.version,
        currentPassword,
        newPassword,
      },
    })
    .then((result) => {
      const c = result.data.customerChangeMyPassword;
      saveCustomerState(c);
      return loginToken(c.email, newPassword);
    });
};

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
      updateUser,
      logout,
      createResetToken,
      updateMyCustomerPassword,
    };
    return { tools };
  },
};
