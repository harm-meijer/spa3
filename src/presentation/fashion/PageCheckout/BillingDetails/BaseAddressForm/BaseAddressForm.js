// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// import config from '../../../../../../../../../sunrise.config';

export default {
  props: {
    address: {
      type: Object,
      required: false,
    },
  },
  components: {
    // BaseForm,
    // BaseInput,
    // BaseSelect,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const form = ref({});
    watch(
      form,
      (form) => {
        emit(
          'update-address',
          JSON.parse(JSON.stringify(form))
        );
      },
      { deep: true }
    );
    return { t, form };
  },
  // watch: {
  //   validForm() {
  //     this.$emit('valid-form', this.validForm);
  //   },
  // },
  computed: {
    // countries() {
    //   const configCountries = config.countries;
    //   const countries = configCountries
    //     ? Object.entries(configCountries).filter(
    //         ([id]) => id === this.$route.params.country
    //       )
    //     : [];
    //   return countries.map(([id, name]) => ({ id, name }));
    // },
    // validForm() {
    //   // @todo: use vuelidate
    //   // return !this.$v.$invalid;
    //   return true;
    // },
  },
  // created() {
  //   if (this.address) {
  //     const { contactInfo, ...address } = this.address;
  //     this.form.value = { ...contactInfo, ...address };
  //     delete this.form.__typename;
  //   }
  //   if (!this.form.country) {
  //     this.form.value = {
  //       ...this.form,
  //       country: this.$route.params.country,
  //     };
  //   }
  // },
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
