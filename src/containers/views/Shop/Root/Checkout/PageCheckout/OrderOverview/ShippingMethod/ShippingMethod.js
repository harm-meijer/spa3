// import { required } from 'vuelidate/lib/validators';
// import BaseRadio from '../../common/form/BaseRadio/BaseRadio.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
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
    console.log(
      'Add set shipping method to cartTools',
      props.cartLike.cartTools
    );
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
    };
  },
  data: () => ({
    selectedShippingMethod: null,
  }),
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
  watch: {
    me(value) {
      this.selectedShippingMethod =
        value?.activeCart?.shippingInfo?.shippingMethod?.methodId;
    },
    // shippingMethodsByLocation(value) {
    //   if (!this.selectedShippingMethod) {
    //     this.selectedShippingMethod =
    //       value.find(
    //         (shippingMethod) => shippingMethod.isDefault
    //       )?.id || value[0]?.id;
    //   }
    // },
    selectedShippingMethod() {
      if (!this.selectedShippingMethod) {
        return;
      }
      //@todo: comes from CartLike, put in setup
      if (this.selectedShippingMethod) {
        return;
      }
      this.updateMyCart([
        {
          setShippingMethod: {
            shippingMethod: {
              typeId: 'shipping-method',
              id: this.selectedShippingMethod,
            },
          },
        },
      ]);
    },
  },
  // validations: {
  //   form: {
  //     shippingMethod: { required },
  //   },
  // },
};
