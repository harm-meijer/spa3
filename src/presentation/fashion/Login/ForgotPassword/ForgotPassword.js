import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
import useResetPasswordForm from 'hooks/useResetPasswordForm';
export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  props: {
    gotoResetToken: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const tools = useCustomerTools();
    const { t } = useI18n();
    const { form, v } = useResetPasswordForm();
    const createToken = () => {
      return tools
        .createResetToken(form.value.email)
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

    return { createToken, getErrorMessage, form, v, t };
  },
  // validations: {
  //   email: { required },
  // },
};
