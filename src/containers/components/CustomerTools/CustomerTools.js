import gql from 'graphql-tag';
import { computed, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLocale from 'hooks/useLocale';
import usePaging from 'hooks/usePaging';
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
//
const useMyOrder = () => {
  const loading = shallowRef(true);
  const error = shallowRef(null);
  const order = shallowRef(null);
  const { locale } = useLocale();
  const route = useRoute();
  const id = computed(() => route.params.id);
  const fetchOrder = () =>
    apolloClient
      .query({
        query: gql`
          query orderById($id: String, $locale: Locale!) {
            me {
              order(id: $id) {
                id
                orderNumber
                createdAt
                lineItems {
                  id
                  name(locale: $locale)
                  productSlug(locale: $locale)
                  quantity
                  price {
                    value {
                      centAmount
                      currencyCode
                      fractionDigits
                    }
                    discounted {
                      value {
                        centAmount
                        currencyCode
                        fractionDigits
                      }
                    }
                  }
                  totalPrice {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                  variant {
                    sku
                    images {
                      url
                    }
                    attributesRaw {
                      name
                      value
                      attributeDefinition {
                        type {
                          name
                        }
                        name
                        label(locale: $locale)
                      }
                    }
                  }
                }
                totalPrice {
                  centAmount
                  currencyCode
                  fractionDigits
                }
                shippingInfo {
                  shippingMethod {
                    name
                    localizedDescription(locale: $locale)
                  }
                  price {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                }
                taxedPrice {
                  totalGross {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                  totalNet {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                }
                discountCodes {
                  discountCode {
                    id
                    code
                    name(locale: $locale)
                  }
                }
                shippingAddress {
                  firstName
                  lastName
                  streetName
                  additionalStreetInfo
                  postalCode
                  city
                  country
                  phone
                  email
                }
                billingAddress {
                  firstName
                  lastName
                  streetName
                  additionalStreetInfo
                  postalCode
                  city
                  country
                  phone
                  email
                }
                paymentInfo {
                  payments {
                    paymentStatus {
                      interfaceCode
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: id.value,
          locale: locale.value,
        },
      })
      .then((result) => {
        order.value = result.data.me.order;
        loading.value = false;
        error.value = null;
      })
      .catch((e) => {
        loading.value = false;
        order.value = null;
        error.value = e;
      });
  watch([id, locale], fetchOrder);
  fetchOrder();
  return { loading, error, order };
};
const useMyOrders = () => {
  const route = useRoute();
  const router = useRouter();
  const page = computed(() =>
    Number(route.params.page || 1)
  );
  const setPage = (page) =>
    router.push({
      ...route,
      params: {
        ...route.params,
        page,
      },
    });
  const { limit, offset } = usePaging(page);
  const error = shallowRef(null);
  const orders = shallowRef(null);
  const total = shallowRef(null);
  const loading = shallowRef(true);
  const fetchOrders = () =>
    apolloClient
      .query({
        query: gql`
          query MyOrders($limit: Int, $offset: Int) {
            MyOrders: me {
              orders(
                sort: "createdAt desc"
                limit: $limit
                offset: $offset
              ) {
                total
                results {
                  orderId: id
                  orderNumber
                  totalPrice {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                  createdAt
                  shipmentState
                  paymentState
                  paymentInfo {
                    payments {
                      paymentStatus {
                        interfaceCode
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          limit: limit.value,
          offset: offset.value,
        },
      })
      .then((result) => {
        orders.value = result.data.MyOrders.orders.results;
        total.value = result.data.MyOrders.orders.total;
        loading.value = false;
      })
      .catch((e) => (error.value = e));

  watch(page, fetchOrders);
  fetchOrders();
  return { error, loading, orders, total, setPage };
};
const resetPassword = ({ token, newPassword }) =>
  apolloClient.mutate({
    mutation: gql`
      mutation resetPassword(
        $tokenValue: String!
        $newPassword: String!
      ) {
        customerResetPassword(
          tokenValue: $tokenValue
          newPassword: $newPassword
        ) {
          firstName
        }
      }
    `,
    variables: {
      tokenValue: token,
      newPassword,
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
      resetPassword,
      useMyOrders,
      useMyOrder,
      updateMyCustomerPassword,
    };
    return { tools };
  },
};
