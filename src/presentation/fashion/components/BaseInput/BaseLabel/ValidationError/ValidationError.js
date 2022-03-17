import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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
  setup(props) {
    const { t, te } = useI18n();

    const validations = computed(() => {
      return Object.keys(props.vuelidate.$params);
    });
    function getErrorMessage(validation) {
      const customError = props.customErrors[validation];
      if (customError) {
        return customError;
      }
      const { type, ...args } =
        props.vuelidate.$params[validation];
      return te(type)
        ? t(type, args)
        : t('unknownValidation');
    }
    return { validations, getErrorMessage };
  },
};
