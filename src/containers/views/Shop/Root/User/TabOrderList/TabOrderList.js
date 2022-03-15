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
  props: {},
  setup(props) {
    const { t } = useI18n();
    const isLoading = computed(() => {
      return true || props;
    });
    const page = computed(() => {
      return 1;
    });
    const orders = computed(() => {
      return isLoading.value ? [] : [];
    });
    const orderListNotEmpty = computed(() => {
      return false;
    });
    const total = computed(() => {
      return 0;
    });

    function translateStatus(state) {
      return state ? t(state) : '-';
    }
    function paymentInfo(order) {
      return t(
        order?.paymentInfo?.payments?.[0]?.paymentStatus
          ?.interfaceCode
      );
    }
    function setPage(page) {
      console.log('need to set page:', page);
    }

    return {
      t,
      isLoading,
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
