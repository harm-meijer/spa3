//@todo: move to presentation and dont wrap in customertools, just
//   call useCustomerTools from presentation
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import BaseDate from 'presentation/components/BaseDate/BaseDate.vue';
import LineItemInfo from 'presentation/CartDetail/CartLikeContentDetail/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from 'presentation/CartDetail/CartLikeContentDetail/CartLikeContentDetail.vue';
import BaseAddress from 'presentation/components/BaseAddress/BaseAddress.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    CartLikeContentDetail,
    BaseDate,
    BaseMoney,
    BaseAddress,
    LineItemInfo,
  },
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { loading, order } = props.tools.useMyOrder();
    const subtotal = computed(() => {
      if (order.value) {
        const { currencyCode, fractionDigits } =
          order.value.totalPrice;
        return {
          centAmount: order.value.lineItems.reduce(
            (acc, li) => acc + li.totalPrice.centAmount,
            0
          ),
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    });
    const paymentInfo = computed(() => {
      return order.value?.paymentInfo?.payments?.[0]
        ?.paymentStatus?.interfaceCode
        ? t(
            order.value?.paymentInfo?.payments?.[0]
              ?.paymentStatus?.interfaceCode
          )
        : '';
    });
    return { t, subtotal, paymentInfo, order, loading };
  },
};
