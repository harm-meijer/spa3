import gql from 'graphql-tag';
// import { required } from 'vuelidate/lib/validators';
// import BaseRadio from '../../common/form/BaseRadio/BaseRadio.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
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
  },
  components: {
    // BaseLabel,
    // ServerError,
    // BaseForm,
    BaseMoney,
    // BaseRadio,
  },
  setup(props) {
    console.log(props.cart);
    return {};
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
        value?.activeCart?.shippingInfo?.shippingMethod?.id;
    },
    shippingMethodsByLocation(value) {
      if (!this.selectedShippingMethod) {
        this.selectedShippingMethod =
          value.find(
            (shippingMethod) => shippingMethod.isDefault
          )?.id || value[0]?.id;
      }
    },
    selectedShippingMethod() {
      if (!this.selectedShippingMethod) {
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
  //@todo: write ShippingMethods hook
  apollo: {
    shippingMethodsByLocation: {
      query: gql`
        query checkoutShippingMethods(
          $currency: Currency!
          $country: Country!
          $state: String
          $locale: Locale
        ) {
          shippingMethodsByLocation(
            currency: $currency
            country: $country
            state: $state
          ) {
            id
            name
            localizedDescription(locale: $locale)
            isDefault
            zoneRates {
              shippingRates {
                isMatching
                freeAbove {
                  centAmount
                }
                price {
                  value {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                  discounted {
                    value {
                      centAmount
                      currencyCode
                      fractionDigits
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency:
            this.me.activeCart.totalPrice.currencyCode,
          locale: 'en',
          ...this.me.activeCart.shippingAddress,
        };
      },
      skip() {
        return !this.cart;
      },
    },
  },
  // validations: {
  //   form: {
  //     shippingMethod: { required },
  //   },
  // },
};
