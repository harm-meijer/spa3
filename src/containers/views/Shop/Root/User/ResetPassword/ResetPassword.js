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
  setup() {
    const { t } = useI18n();
    const newPassword = shallowRef('p@ssword');
    const confirmPassword = shallowRef('p@ssword');
    const resetPassword = () => {
      return Promise.reject(new Error('not implemented'));
    };
    function getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return t('invalidSubject');
      }
      return t('unknownError');
    }

    return {
      t,
      newPassword,
      confirmPassword,
      resetPassword,
      getErrorMessage,
    };
  },
  // validations: {
  //   newPassword: { required },
  //   confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
  // },
};
