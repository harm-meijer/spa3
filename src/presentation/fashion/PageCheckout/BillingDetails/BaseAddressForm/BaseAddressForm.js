import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
// import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// import config from '../../../../../../../../../sunrise.config';

export default {
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
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
  setup(props, { emit }) {
    const { t } = useI18n();
    const { form, v } =
      props.cartLike.cartTools.baseAddress;
    watch(
      form,
      (form) => {
        emit(
          'update-address',
          JSON.parse(JSON.stringify(form))
        );
        //Invalid flag for form???
        console.log(v.value.form.$invalid);
      },
      { deep: true }
    );
    const validForm = computed(() => {
      // @todo: use vuelidate
      //return !this.v$.$invalid;
      return true;
    });
    watch(validForm, (validForm) => {
      emit('valid-form', validForm);
    });

    return { t, form, validForm, v };
  },
};
