// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import config from '../../../../../../../../../sunrise.config';

export default {
  props: {
    address: {
      type: Object,
      required: false,
    },
  },
  components: {
    // BaseForm,
    // ServerError,
    // BaseInput,
    // BaseSelect,
  },
  setup() {
    const { t } = useI18n();
    const form = ref({});
    return { t, form };
  },
  watch: {
    formToJSON() {
      this.$emit('update-address', this.form);
    },
    validForm() {
      this.$emit('valid-form', this.validForm);
    },
  },
  computed: {
    countries() {
      const configCountries = config.countries;
      const countries = configCountries
        ? Object.entries(configCountries).filter(
            ([id]) => id === this.$route.params.country
          )
        : [];
      return countries.map(([id, name]) => ({ id, name }));
    },
    formToJSON() {
      return JSON.stringify(this.form);
    },
    validForm() {
      // @todo: use vuelidate
      // return !this.$v.$invalid;
      return true;
    },
  },
  created() {
    if (this.address) {
      const { contactInfo, ...address } = this.address;
      this.form.value = { ...contactInfo, ...address };
      delete this.form.__typename;
    }
    if (!this.form.country) {
      this.form.value = {
        ...this.form,
        country: this.$route.params.country,
      };
    }
  },
  //@todo: need vuelidata validation
  // validations: {
  //   form: {
  //     firstName: { required },
  //     lastName: { required },
  //     streetName: { required },
  //     additionalStreetInfo: {},
  //     postalCode: { required },
  //     city: { required },
  //     country: { required },
  //     phone: {},
  //     email: { required, email },
  //   },
  // },
};
