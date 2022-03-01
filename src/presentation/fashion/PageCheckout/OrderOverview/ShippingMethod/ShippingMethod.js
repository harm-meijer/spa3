//@todo: use vuelidate

// import { required } from 'vuelidate/lib/validators';
// import BaseRadio from '../../common/form/BaseRadio/BaseRadio.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import { ref, watch } from 'vue';
import useShippingMethods from 'hooks/useShippingMethods';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
// import BaseLabel from '../../common/form/BaseLabel/BaseLabel.vue';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
// import MONEY_FRAGMENT from '../../Money.gql';
// import { locale } from '../../common/shared';
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
    cartLike: {
      type: Object,
      required: true,
    },
  },
  components: {
    // BaseLabel,
    // ServerError,
    // BaseForm,
    BaseMoney,
    // BaseRadio,
  },
  setup(props) {
    //@todo: split up in container and presentation
    const { total, loading, error, shippingMethods } =
      useShippingMethods();
    const selectedShippingMethod = ref(
      props.cart?.shippingInfo?.shippingMethod?.methodId
    );
    watch(selectedShippingMethod, (methodId) => {
      if (!methodId) {
        return;
      }
      props.cartLike.cartTools.setShippingMethod(methodId);
    });
    const price = (shippingMethod) => {
      return props.cart.totalPrice.centAmount >
        (shippingMethod?.zoneRates[0]?.shippingRates?.[0]
          ?.freeAbove?.centAmount || Infinity)
        ? null
        : shippingMethod?.zoneRates[0]?.shippingRates?.[0]
            ?.price;
    };
    return {
      total,
      loading,
      error,
      shippingMethods,
      price,
      selectedShippingMethod,
    };
  },
  // validations: {
  //   form: {
  //     shippingMethod: { required },
  //   },
  // },
};
