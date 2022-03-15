import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
//@todo: need basedate
// import BaseDate from "../../common/BaseDate/BaseDate.vue";
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import Pagination from 'presentation/components/Pagination/Pagination.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    BaseMoney,
    // BaseDate,
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
    const { loading, orders, total } =
      props.tools.useMyOrders();
    const { t } = useI18n();
    const page = computed(() => {
      return 1;
    });
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
    function setPage(page) {
      console.log('need to set page:', page);
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
