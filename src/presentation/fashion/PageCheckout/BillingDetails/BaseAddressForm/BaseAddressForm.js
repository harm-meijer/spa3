import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
// import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
// import config from '../../../../../../../../../sunrise.config';

export default {
  props: {
    address: {
      type: Object,
      required: false,
    },
  },
  components: {
    // BaseForm,
    BaseInput,
    // BaseSelect,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const form = ref({});
    watch(
      form,
      (form) => {
        emit(
          'update-address',
          JSON.parse(JSON.stringify(form))
        );
        //Invalid flag for form???
        console.log(v$.value.form.$invalid);
      },
      { deep: true }
    );
    const v$ = useVuelidate();
    const validForm = computed(() => {
      // @todo: use vuelidate
      //return !this.v$.$invalid;
      return true;
    });
    watch(validForm, (validForm) => {
      emit('valid-form', validForm);
    });

    return { t, form, validForm, v$ };
  },

  //@todo: need vuelidata validation
  validations() {
    return {
      form: {
        firstName: { required, $lazy: true },
        lastName: { required, $lazy: true },
        streetName: { required, $lazy: true },
        additionalStreetInfo: {},
        postalCode: { required, $lazy: true },
        city: { required, $lazy: true },
        country: { required, $lazy: true },
        phone: {},
        email: { required, email, $lazy: true },
      },
    };
  },
};
