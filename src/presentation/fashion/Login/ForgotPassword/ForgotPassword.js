import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
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
    gotoResetToken: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const email = shallowRef('emma.noor@commercetools.com');
    const createToken = () => {
      return props.tools.tools
        .createResetToken(email.value)
        .then((result) =>
          props.gotoResetToken(
            result.data.customerCreatePasswordResetToken
              .value
          )
        );
    };
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidSubject') {
        return t('invalidSubject');
      }
      return t('unknownError');
    };

    return { createToken, getErrorMessage, email, t };
  },
  // validations: {
  //   email: { required },
  // },
};
