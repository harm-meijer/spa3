import { useI18n } from 'vue-i18n';

export default {
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    return { t, ...props.tools.tools };
  },
};
