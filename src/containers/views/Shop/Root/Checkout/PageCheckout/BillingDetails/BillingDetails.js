// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
// import BaseAddressForm from '../BaseAddressForm/BaseAddressForm.vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';

import { useI18n } from 'vue-i18n';
import BaseAddressForm from './BaseAddressForm/BaseAddressForm.vue';

export default {
  props: {
    billingAddress: {
      type: Object,
      required: false,
    },
    shippingAddress: {
      type: Object,
      required: false,
    },
  },
  components: {
    // ServerError,
    // BaseForm,
    BaseAddressForm,
    // BaseInput,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return { t };
  },
  data: () => ({
    differentAddress: false,
    newBillingAddress: null,
    newShippingAddress: null,
  }),
  watch: {
    differentAddress() {
      if (!this.differentAddress) {
        this.newShippingAddress = null;
        this.validShippingForm(true);
      } else {
        this.validShippingForm(false);
      }
    },
    billingToJSON() {
      this.$emit(
        'update-billing-details',
        this.newBillingAddress
      );
    },
    shippingToJSON() {
      this.$emit(
        'update-shipping-details',
        this.newShippingAddress
      );
    },
  },
  computed: {
    billingToJSON() {
      return JSON.stringify(this.newBillingAddress);
    },
    shippingToJSON() {
      return JSON.stringify(this.newShippingAddress);
    },
  },
  methods: {
    unsetBillingAddress() {
      return this.setBillingAddress(null);
    },
    updateBillingAddress(address) {
      this.newBillingAddress = address;
    },
    updateShippingAddress(address) {
      this.newShippingAddress = address;
    },
    validBillingForm(valid) {
      this.$emit('valid-billing-form', valid);
    },
    validShippingForm(valid) {
      this.$emit('valid-shipping-form', valid);
    },
  },
};
