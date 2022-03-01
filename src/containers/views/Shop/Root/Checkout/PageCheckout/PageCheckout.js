import BillingDetails from './BillingDetails/BillingDetails.vue';
import OrderOverview from './OrderOverview/OrderOverview.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';
import { ref } from 'vue';

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
    const placeOrder = () => {
      // @todo: need to implement in CartLike
    };
    const shippingMethod = ref(null);
    const billingAddress = ref(null);
    const shippingAddress = ref(null);
    const orderComplete = ref(false);
    const validBillingForm = ref(false);
    const validShippingForm = ref(true);
    const showError = ref(false);

    const setValidBillingForm = (valid) => {
      validBillingForm.value = valid;
    };
    const setValidShippingForm = (valid) => {
      validShippingForm.value = valid;
    };
    const updateBilling = (billingDetails) => {
      billingAddress.value = billingDetails;
    };
    const updateShipping = (shippingDetails) => {
      shippingAddress.value = shippingDetails;
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
    };
  },
};
