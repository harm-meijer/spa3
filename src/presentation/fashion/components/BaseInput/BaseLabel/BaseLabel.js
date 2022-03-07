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
  setup() {
    const { t } = useI18n();
    const required = computed(() => {
      //@todo: implement vuelidate
      // return this.vuelidate?.$params?.required;
      return true;
    });
    return { t, required };
  },
};
