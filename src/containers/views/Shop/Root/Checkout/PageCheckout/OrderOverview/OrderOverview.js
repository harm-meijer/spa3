// @todo: add scrollbar
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import PaymentMethod from "../PaymentMethod/index";
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { useI18n } from 'vue-i18n';
import ShippingMethod from './ShippingMethod/ShippingMethod.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';

export default {
  props: {
    showError: {
      type: Boolean,
      required: false,
    },
    cart: {
      type: Object,
      required: true,
    },
    cartLike: {
      type: Object,
      required: true,
    },
  },
  components: {
    ShippingMethod,
    BasePrice,
    CartLike,
    // PaymentMethod,
    // VuePerfectScrollbar,
  },
  setup(props) {
    const { t } = useI18n();
    const placeOrder = () => {
      // @todo: need to implement in CartLike
    };
    return {
      ...props.cartLike.cartTools,
      t,
      placeOrder,
    };
  },
  data: () => ({
    paid: false,
    paymentId: null,
  }),
  methods: {
    cardPaid(paymentId) {
      if (paymentId) {
        this.paymentId = paymentId;
      }
      this.paid = true;
    },
    updateShippingMethod(shippingId) {
      this.$emit('update-shipping', shippingId);
      this.$apollo.queries.me.refresh();
    },
    placeOrder() {
      this.$emit('complete-order', this.paymentId);
    },
  },
};
