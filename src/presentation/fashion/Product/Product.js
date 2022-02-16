export default {
  name: 'ProductPresentation',
  props: {
    products: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object,
      required: false,
    },
    changeSKU: {
      type: Function,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    skus: {
      type: Array,
      required: true,
    },
  },
};
