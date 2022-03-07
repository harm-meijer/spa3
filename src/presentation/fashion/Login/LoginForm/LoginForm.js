//@todo: implement vuelidate
// import { required, email } from 'vuelidate/lib/validators';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
// import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    BaseForm,
    BaseInput,
    ServerError,
    // LoadingButton,
  },
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const form = shallowRef({
      email: 'emma.noor@commercetools.com',
      password: 'p@ssword',
    });
    const customerSignMeIn = () =>
      props.tools.tools.login(
        form.value.email,
        form.value.password
      );
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidCredentials') {
        return t('invalidCredentials');
      }
      return t('unknownError');
    };
    return {
      form,
      customerSignMeIn,
      t,
      getErrorMessage,
    };
  },
  // validations: {
  //   form: {
  //     email: { required, email },
  //     password: { required },
  //   },
  // },
};
