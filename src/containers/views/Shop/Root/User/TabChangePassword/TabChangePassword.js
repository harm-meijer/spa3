// import { required, sameAs } from 'vuelidate/lib/validators';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import { useI18n } from 'vue-i18n';
import { shallowRef } from 'vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidCurrentPassword') {
        return t('invalidPassword');
      }
      return t('unknownError');
    };
    const form = shallowRef({});
    const updateCustomerPassword = () =>
      props.tools
        .updateMyCustomerPassword(form.value)
        .then(() => {
          form.value = {};
        });
    return {
      t,
      getErrorMessage,
      updateCustomerPassword,
      form,
      ...props.tools,
    };
  },
  // validations: {
  //   form: {
  //     currentPassword: { required },
  //     newPassword: { required },
  //     newPasswordConfirm: { sameAsPassword: sameAs('newPassword') },
  //   },
  // },
};
