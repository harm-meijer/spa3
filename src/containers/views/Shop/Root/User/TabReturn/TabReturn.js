import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import BaseDate from 'presentation/components/BaseDate/BaseDate.vue';
import LineItemInfo from 'presentation/CartDetail/CartLikeContentDetail/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from 'presentation/CartDetail/CartLikeContentDetail/CartLikeContentDetail.vue';
import BaseAddress from 'presentation/components/BaseAddress/BaseAddress.vue';
import { shallowRef } from 'vue';
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
    const selectedItems = shallowRef([]);
    const { loading, order } = props.tools.useMyOrder();
    function updateSelectedItems(items) {
      selectedItems.value = items;
    }
    function closeModal() {
      throw new Error('not implemented to close modal');
      // this.$modal.hide('returnSuccess');
      // changeRoute(
      //   { name: 'orders' }, this,
      // );
    }
    function submitReturn() {
      if (selectedItems.value.length === 0) {
        alert(t('alert'));
      } else {
        console
          .log('need mutate', {
            mutation: `
            mutation returnItems($id: String, $version: Long!, $items: [ReturnItemDraftType!]!){
              updateOrder(version: $version, id: $id, actions:{
                addReturnInfo: {
                  items: $items
                }
              }){
                orderNumber
              }
            }`,
            variables: {
              id: this.$route.params.id,
              version: order.version,
              items: selectedItems.value,
            },
          })
          .then(() => {
            // this.$router.push({ name: 'orders' })
            // this.$modal.show('returnSuccess');
          });
      }
    }
    return {
      t,
      updateSelectedItems,
      submitReturn,
      closeModal,
      loading,
      order,
    };
  },
};
