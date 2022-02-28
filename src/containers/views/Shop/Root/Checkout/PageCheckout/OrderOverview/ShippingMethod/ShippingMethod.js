//@todo: split up in presentation and component
// import { required } from 'vuelidate/lib/validators';
// import BaseRadio from '../../common/form/BaseRadio/BaseRadio.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import { ref, watch } from 'vue';
import useShippingMethods from '../../../../../../../../../composition/useShippingMethods';
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
      //@todo: price above and zone rates??
      return shippingMethod?.zoneRates[0]
        ?.shippingRates?.[0]?.price;
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
  methods: {
    price(shippingMethod) {
      const shippingRate =
        this.matchingShippingRate(shippingMethod);
      return this.isFree(shippingRate)
        ? null
        : shippingRate.price;
    },
    matchingShippingRate(shippingMethod) {
      return this.matchingZoneRate(
        shippingMethod
      ).shippingRates.find(
        (shippingRate) => shippingRate.isMatching
      );
    },
    matchingZoneRate(shippingMethod) {
      return shippingMethod.zoneRates.find((zoneRate) =>
        zoneRate.shippingRates.some(
          (shippingRate) => shippingRate.isMatching
        )
      );
    },
    isFree(shippingRate) {
      const totalPrice =
        this.me.activeCart.totalPrice.centAmount;
      return (
        totalPrice > shippingRate.freeAbove?.centAmount
      );
    },
  },
  // validations: {
  //   form: {
  //     shippingMethod: { required },
  //   },
  // },
};
