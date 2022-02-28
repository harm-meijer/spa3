// import CheckoutTopSection from "../CheckoutTopSection/CheckoutTopSection.vue";
// import OrderOverview from "../OrderOverview/OrderOverview.vue";

import BillingDetails from './BillingDetails/BillingDetails.vue';
import OrderOverview from './OrderOverview/OrderOverview.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';

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
    return { ...props.cartLike.cartTools, placeOrder };
  },
  data: () => ({
    shippingMethod: null,
    billingAddress: null,
    shippingAddress: null,
    orderComplete: false,
    validBillingForm: false,
    validShippingForm: true,
    showError: false,
  }),
  methods: {
    setValidBillingForm(valid) {
      this.validBillingForm = valid;
    },
    setValidShippingForm(valid) {
      this.validShippingForm = valid;
    },
    updateBilling(billingDetails) {
      this.billingAddress = billingDetails;
    },
    updateShipping(shippingDetails) {
      this.shippingAddress = shippingDetails;
    },
    updateShippingMethod(shippingId) {
      this.shippingMethod = shippingId;
    },
  },
};
