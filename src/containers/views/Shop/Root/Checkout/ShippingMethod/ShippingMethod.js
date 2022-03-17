//@todo: use vuelidate

// import { required } from 'vuelidate/lib/validators';
import { ref, watch } from 'vue';
import useShippingMethods from 'hooks/useShippingMethods';
import ShippingMethodPresentation from 'presentation/PageCheckout/OrderOverview/ShippingMethod/ShippingMethod.vue';
import useCartTools from 'hooks/useCartTools';
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
  },
  components: {
    ShippingMethodPresentation,
  },
  setup(props) {
    const { total, loading, error, shippingMethods } =
      useShippingMethods();
    const selectedShippingMethod = ref(
      props.cart?.shippingInfo?.shippingMethod?.methodId
    );
    const cartTools = useCartTools();
    watch(selectedShippingMethod, (methodId) => {
      if (!methodId) {
        return;
      }
      cartTools.setShippingMethod(methodId);
    });
    const setSelectedShippingMethod = (method) => {
      selectedShippingMethod.value = method;
    };
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
      setSelectedShippingMethod,
    };
  },
  // validations: {
  //   form: {
  //     shippingMethod: { required },
  //   },
  // },
};
