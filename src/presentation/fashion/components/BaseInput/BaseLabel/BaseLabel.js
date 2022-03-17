import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ValidationError from './ValidationError/ValidationError.vue';

export default {
  components: { ValidationError },
  props: {
    vuelidate: {
      type: Object,
    },
    label: {
      type: String,
    },
    customErrors: {
      type: Object,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const required = computed(() => {
      //@todo: look at validationError, vuelidate update broke this
      return props.vuelidate?.$params?.required;
    });
    return { t, required };
  },
};
