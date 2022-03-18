//@todo: do not need vuelidate but set default method when opening
//  and no shipping method has been set already

import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import { ref, shallowRef, watch } from 'vue';
import useShippingMethods from 'hooks/useShippingMethods';
import useCartTools from 'hooks/useCartTools';
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseMoney,
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

    const method = shallowRef(selectedShippingMethod);
    watch(method, (method) => {
      setSelectedShippingMethod(method);
    });
    return {
      method,
      total,
      loading,
      error,
      shippingMethods,
      price,
      selectedShippingMethod,
      setSelectedShippingMethod,
    };
  },
};
