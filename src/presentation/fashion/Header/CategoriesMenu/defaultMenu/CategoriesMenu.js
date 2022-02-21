export default {
  name: 'CategoriesMenuPresentation',
  props: {
    locale: {
      type: String,
      required: true,
    },
    isActive: {
      type: Function,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
};
