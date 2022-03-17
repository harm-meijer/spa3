import {
  computed,
  onMounted,
  onUnmounted,
  shallowRef,
} from 'vue';
import { useRouter } from 'vue-router';
import useMyOrder from 'hooks/useMyOrder';
import useMyOrders from 'hooks/useMyOrders';
import basic from './ct/useCustomerTools';
import {
  loginToken,
  logout as lo,
} from '../src/apollo/auth';
import { cache } from '../src/apollo';
import { CUSTOMER } from '../src/constants';
import { createReactive } from './lib';
const saveCustomerState = (c) => {
  customerGlobal.setValue(c);
  cache.reset();
};
const createResetToken = basic.createResetToken;
const returnItems = (id, version, items) => {
  return basic.returnItems(id, version, items).then(() => {
    cache.reset();
    //@todo: move to order detail
  });
};
const resetPassword = basic.resetPassword;
const signup = (form) =>
  basic
    .signup(form)
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

const updateUser = ({
  version,
  firstName,
  lastName,
  email,
}) =>
  basic
    .updateUser({ version, firstName, lastName, email })
    .then((result) => {
      saveCustomerState(result.data.updateMyCustomer);
    });
const li = (email, password) =>
  basic
    .login(email, password)
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
}) =>
  basic
    .updateMyCustomerPassword({
      currentPassword,
      newPassword,
      version: customerGlobal.ref.value.version,
    })
    .then((result) => {
      const c = result.data.customerChangeMyPassword;
      saveCustomerState(c);
      return loginToken(c.email, newPassword);
    });
const customerGlobal = createReactive(
  JSON.parse(localStorage.getItem(CUSTOMER)),
  (newValue) =>
    localStorage.setItem(CUSTOMER, JSON.stringify(newValue))
);
function useCustomerTools() {
  const customer = shallowRef(customerGlobal.ref.value);
  const unListen = { fn: () => 88 };
  onMounted(() => {
    unListen.fn = customerGlobal.addListener((newValue) => {
      customer.value = newValue;
    });
  });
  onUnmounted(() => unListen.fn());
  const router = useRouter();
  const showLoggedIn = computed(() => {
    return Boolean(customer.value);
  });
  const logout = () => {
    lo();
    customerGlobal.setValue(null);
    cache.reset();
    router.push({ name: 'login' });
  };
  const login = (email, password) =>
    li(email, password).then(() =>
      router.push({ name: 'user' })
    );
  return {
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
    returnItems,
    updateMyCustomerPassword,
  };
}
export default useCustomerTools;
