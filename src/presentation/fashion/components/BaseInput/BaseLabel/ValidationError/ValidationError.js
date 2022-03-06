import { computed } from 'vue';

//@todo: implement vuelidate
export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    customErrors: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const validations = computed(() => {
      //@todo: implement vuelidate
      // return Object.keys(this.vuelidate.$params);
      return true;
    });
    function getErrorMessage() {
      // const customError = this.customErrors[validation];
      // if (customError) {
      //   return customError;
      // }
      // const { type, ...args } = this.vuelidate.$params[validation];
      // return this.$te(type) ? this.$t(type, args) : this.$t('unknownValidation');
    }
    return { validations, getErrorMessage };
  },
};
