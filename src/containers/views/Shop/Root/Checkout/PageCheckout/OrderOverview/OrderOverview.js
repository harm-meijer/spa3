// @todo: add scrollbar
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import ShippingMethod from "../ShippingMethod/ShippingMethod.vue";
// import PaymentMethod from "../PaymentMethod/index";
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import CartLikePriceDetail from 'presentation/CartDetail/CartLikePriceDetail/CartLikePriceDetail.vue';
import LineItemInfo from 'presentation/CartDetail/CartLikeContentDetail/LineItemInfo/LineItemInfo.vue';
import { useI18n } from 'vue-i18n';

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
    LineItemInfo,
    // ShippingMethod,
    // PaymentMethod,
    CartLikePriceDetail,
    BasePrice,
    // VuePerfectScrollbar,
  },
  setup(props) {
    const { t } = useI18n();
    const placeOrder = () => {
      // @todo: need to implement in CartLike
    };
    return { ...props.cartLike.cartTools, t, placeOrder };
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
