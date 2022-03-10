import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import { useI18n } from 'vue-i18n';
import { shallowRef } from 'vue';
//import resetPassword
export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const email = shallowRef(null);
    const createToken = () => {
      return Promise.reject(new Error('not implemented'));
    };
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidSubject') {
        return this.$t('invalidSubject');
      }
      return this.$t('unknownError');
    };

    return { createToken, getErrorMessage, email, t };
  },
  // validations: {
  //   email: { required },
  // },
};
