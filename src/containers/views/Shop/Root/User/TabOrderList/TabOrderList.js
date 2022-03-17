import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import BaseDate from 'presentation/components/BaseDate/BaseDate.vue';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import Pagination from 'presentation/components/Pagination/Pagination.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    BaseMoney,
    BaseDate,
    Spinner,
    Pagination,
  },
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { setPage, loading, orders, total, page } =
      props.tools.useMyOrders();
    const { t } = useI18n();
    const orderListNotEmpty = computed(() => {
      return Boolean(orders.value.length);
    });

    function translateStatus(state) {
      return state ? t(state) : '-';
    }
    function paymentInfo(order) {
      return order?.paymentInfo?.payments?.[0]
        ?.paymentStatus?.interfaceCode
        ? t(
            order?.paymentInfo?.payments?.[0]?.paymentStatus
              ?.interfaceCode
          )
        : '';
    }

    return {
      t,
      loading,
      page,
      orders,
      orderListNotEmpty,
      total,
      translateStatus,
      paymentInfo,
      setPage,
    };
  },
};
