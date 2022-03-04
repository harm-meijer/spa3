//@todo: implement vuelidate
// import { required, email } from 'vuelidate/lib/validators';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
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
    // ServerError,
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
    const customerSignMeIn = () => {
      props.tools.tools.login(
        form.value.email,
        form.value.password
      );
    };
    return { form, customerSignMeIn, t };
  },
  // validations: {
  //   form: {
  //     email: { required, email },
  //     password: { required },
  //   },
  // },
};
