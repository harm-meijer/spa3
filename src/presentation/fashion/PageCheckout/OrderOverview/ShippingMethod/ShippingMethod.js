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
    watch(shippingMethods, (shippingMethods) => {
      if (
        !props.cart?.shippingInfo?.shippingMethod
          ?.methodId &&
        Boolean(shippingMethods?.length)
      ) {
        selectedShippingMethod.value = (
          shippingMethods.find(
            ({ isDefault }) => isDefault
          ) || shippingMethods[0]
        ).methodId;
      }
    });
    const setSelectedShippingMethod = (method) => {
      selectedShippingMethod.value = method;
    };
    const price = (shippingMethod) => {
      //zone rates not for this country will be filtered out by graphql
      //  shipping rates are not.
      const rate = shippingMethod?.zoneRates
        ?.flatMap(({ shippingRates }) => shippingRates)
        .find(({ isMatching }) => isMatching);
      return props.cart.totalPrice.centAmount >
        (rate?.freeAbove?.centAmount || Infinity)
        ? null
        : rate?.price;
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
