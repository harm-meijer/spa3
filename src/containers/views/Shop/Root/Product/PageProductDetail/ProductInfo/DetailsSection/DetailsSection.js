import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    currentVariant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const expanded = shallowRef([true, false]);
    //@todo: move to top and pass
    // const { locale } = useLocale();
    const productAttributes = computed(() => {
      const attributes =
        props.currentVariant.attributesRaw.map(
          ({ name, value }) => [
            name,
            //@todo: value is json, should make getValue (not getting reactive value)
            value,
          ]
        );
      // return productAttributes(attributes, locale);
      return attributes;
    });
    const openAccordion = (e) => {
      const contextPanelGroup = window
        .$('.pdp-accord-toggle')
        .parents('.panel-group-pdp');
      const contextPanel = window
        .$(e.target)
        .parents('.panel-default');
      const contextButton = window.$(
        '.accordion-plus',
        contextPanel
      );
      contextButton.toggleClass('accordion-minus');
      // Remove minus class on all other buttons
      contextPanelGroup
        .find('.accordion-plus')
        .not(contextButton)
        .removeClass('accordion-minus');
    };
    const toggle = (index) => {
      const copy = [...this.expanded];
      copy[index] = !copy[index];
      this.expanded = copy;
    };
    return {
      expanded,
      productAttributes,
      openAccordion,
      toggle,
      t,
    };
  },
};
