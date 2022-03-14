//@todo: implement vuelidate
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    BaseInput,
    BaseForm,
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
    const form = shallowRef({
      ...props.tools.customer.value,
    });
    const updateCustomerProfile = () => {
      return props.tools.updateUser(form.value);
    };
    return { t, form, updateCustomerProfile };
  },
  // validations: {
  //   form: {
  //     email: { required, email },
  //     firstName: { required },
  //     lastName: { required },
  //   },
  // },
};
