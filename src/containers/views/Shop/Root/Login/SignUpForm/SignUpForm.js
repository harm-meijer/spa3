//@todo: implement vuelidate
// import {
//   required, email, minLength, sameAs,
// } from 'vuelidate/lib/validators';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
// import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {},
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
    const customerSignMeUp = () => {
      props.tools.tools.signup(form.value);
    };
    return { t, form, customerSignMeUp };
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
