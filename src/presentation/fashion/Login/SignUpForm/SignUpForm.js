//@todo: implement vuelidate
// import {
//   required, email, minLength, sameAs,
// } from 'vuelidate/lib/validators';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
// import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    ServerError,
    BaseInput,
    BaseForm,
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
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'mail.test@commercetools.com',
      password: 'p@ssword',
      repeatPassword: 'p@ssword',
      agreeToTerms: true,
    });
    const customerSignMeUp = () =>
      props.tools.tools.signup(form.value);

    const getErrorMessage = ({ code, field }) => {
      if (code === 'DuplicateField' && field === 'email') {
        return t('duplicatedEmail');
      }
      return t('unknownError');
    };
    const change = (key, val) => {
      form.value = { ...form.value, [key]: val };
    };
    return {
      change,
      t,
      form,
      customerSignMeUp,
      getErrorMessage,
    };
  },
  // validations: {
  //   form: {
  //     firstName: { required },
  //     lastName: { required },
  //     email: { required, email },
  //     password: { required, minLength: minLength(5) },
  //     repeatPassword: {
  //       sameAsPassword: sameAs('password'),
  //     },
  //     agreeToTerms: {
  //       required,
  //       mustBeAgreed: sameAs(() => true),
  //     },
  //   },
  // },
};