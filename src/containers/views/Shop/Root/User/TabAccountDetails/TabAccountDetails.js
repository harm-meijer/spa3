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
    return { t, form };
  },
  methods: {
    updateCustomerProfile() {
      //@todo: update customer
      return Promise.reject(new Error('not yet implented'));
      // return this.updateMyCustomer([
      //   { changeEmail: { email: this.form.email } },
      //   {
      //     setFirstName: { firstName: this.form.firstName },
      //   },
      //   { setLastName: { lastName: this.form.lastName } },
      // ]);
    },
  },
  // validations: {
  //   form: {
  //     email: { required, email },
  //     firstName: { required },
  //     lastName: { required },
  //   },
  // },
};
