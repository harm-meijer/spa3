import BaseMoney from '../BaseMoney/BaseMoney.vue';

export default {
  components: {
    BaseMoney,
  },
  props: {
    price: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasDiscount() {
      return this.price?.discounted;
    },
    discountedPrice() {
      return this.price?.discounted?.value;
    },
    originalPrice() {
      return this?.price?.value;
    },
  },
};
