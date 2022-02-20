export default {
  name: 'ProductPresentation',
  props: {
    product: {
      type: Object,
      required: false,
    },
    changeLine: {
      type: Function,
      required: true,
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
    store: {
      type: String,
      required: false,
    },
    setStore: {
      type: Function,
      required: true,
    },
  },
};
