// @todo: add scrollbar
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PaymentMethod from './PaymentMethod/PaymentMethod.vue';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { useI18n } from 'vue-i18n';
import ShippingMethod from 'containers/views/Shop/Root/Checkout/ShippingMethod/ShippingMethod.vue';
import { ref } from 'vue';
import useCartTools from 'hooks/useCartTools';

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
  },
  components: {
    ShippingMethod,
    BasePrice,
    PaymentMethod,
    // VuePerfectScrollbar,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const paid = ref(false);
    const paymentId = ref(null);
    const cardPaid = (paymentId) => {
      if (paymentId) {
        paymentId.value = paymentId;
      }
      paid.value = true;
    };
    const updateShippingMethod = (shippingId) => {
      emit('update-shipping', shippingId);
    };
    const placeOrder = () => {
      emit('complete-order', paymentId);
    };
    return {
      ...useCartTools(),
      t,
      cardPaid,
      updateShippingMethod,
      paymentId,
      paid,
      placeOrder,
    };
  },
};
