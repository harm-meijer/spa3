//@todo: implement vuelidate
// import { required, email } from 'vuelidate/lib/validators';
import ServerError from 'containers/components/ServerError/ServerError.vue';
// import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
//@todo: make a CartLike component for customer profile and editing

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    // BaseForm,
    // BaseInput,
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
    const error = shallowRef(null);
    const { t } = useI18n();
    const form = shallowRef({
      email: 'emma.noor@commercetools.com',
      password: 'p@ssword',
    });
    const customerSignMeIn = () => {
      props.tools.tools
        .login(form.value.email, form.value.password)
        .catch((e) => (error.value = e));
    };
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
      error,
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
