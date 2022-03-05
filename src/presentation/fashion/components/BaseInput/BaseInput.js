import { computed } from 'vue';
import BaseLabel from './BaseLabel/BaseLabel.vue';

export default {
  inheritAttrs: false,
  components: { BaseLabel },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: Object,
    label: String,
    customErrors: Object,
  },
  setup(props, { emit, attrs }) {
    const value = computed(() =>
      attrs.type === 'checkbox' ? null : props.modelValue
    );
    const checked = computed(() =>
      attrs.type === 'checkbox' ? props.modelValue : null
    );
    const updateValue = (e) => {
      emit(
        'update:modelValue',
        attrs.type === 'checkbox'
          ? e.target.checked
          : e.target.value
      );
    };
    return { updateValue, value, checked };
  },
  computed: {
    errorClass() {
      //@todo: implement vuelidate
      // return { error: this.vuelidate?.$error };
      return { error: null };
    },
  },
};
