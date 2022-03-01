import BillingDetails from './BillingDetails/BillingDetails.vue';
import OrderOverview from './OrderOverview/OrderOverview.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  components: {
    // CheckoutTopSection,
    OrderOverview,
    BillingDetails,
    CartLike,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    cart: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const router = useRouter();
    const shippingMethod = shallowRef(null);
    const billingAddress = shallowRef(null);
    const shippingAddress = shallowRef(null);
    const orderComplete = shallowRef(false);
    const validBillingForm = shallowRef(false);
    const validShippingForm = shallowRef(true);
    const showError = shallowRef(false);

    const placeOrder = () => {
      props.cartLike.cartTools
        .createMyOrderFromCart({
          billingAddress,
          shippingAddress,
        })
        .then(() => (orderComplete.value = true));
    };
    if (!props.cart) {
      router.replace({ name: 'home' });
    }
    const setValidBillingForm = (valid) => {
      validBillingForm.value = valid;
    };
    const setValidShippingForm = (valid) => {
      validShippingForm.value = valid;
    };
    const updateBilling = (billingDetails) => {
      billingAddress.value = JSON.parse(
        JSON.stringify(billingDetails)
      );
    };
    const updateShipping = (shippingDetails) => {
      shippingAddress.value = JSON.parse(
        JSON.stringify(shippingDetails)
      );
    };
    const updateShippingMethod = (shippingId) => {
      shippingMethod.value = shippingId;
    };

    return {
      ...props.cartLike.cartTools,
      placeOrder,
      shippingMethod,
      billingAddress,
      shippingAddress,
      orderComplete,
      validBillingForm,
      validShippingForm,
      showError,
      setValidBillingForm,
      setValidShippingForm,
      updateBilling,
      updateShipping,
      updateShippingMethod,
      t,
    };
  },
};
