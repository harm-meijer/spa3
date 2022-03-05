//@todo: use vuelidate

// import { required } from 'vuelidate/lib/validators';
// import BaseRadio from '../../common/form/BaseRadio/BaseRadio.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import { shallowRef, watch } from 'vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
// import BaseLabel from '../../common/form/BaseLabel/BaseLabel.vue';
// import MONEY_FRAGMENT from '../../Money.gql';
// import { locale } from '../../common/shared';
export default {
  props: {
    total: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object,
      required: false,
    },
    shippingMethods: {
      type: Array,
      required: false,
    },
    price: {
      type: Function,
      required: true,
    },
    selectedShippingMethod: {
      type: String,
      required: true,
    },
    setSelectedShippingMethod: {
      type: Function,
      required: true,
    },
  },
  components: {
    // BaseLabel,
    // BaseForm,
    BaseMoney,
    // BaseRadio,
  },
  setup(props) {
    const method = shallowRef(props.selectedShippingMethod);
    watch(method, (method) => {
      props.setSelectedShippingMethod(method);
    });
    return { method };
  },
};
