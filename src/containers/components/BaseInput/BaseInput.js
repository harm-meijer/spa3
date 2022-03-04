import BaseLabel from './BaseLabel/BaseLabel.vue';

export default {
  inheritAttrs: false,
  components: { BaseLabel },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: Object,
    label: String,
    customErrors: Object,
  },
  setup() {
    return {};
  },
  computed: {
    errorClass() {
      //@todo: implement vuelidate
      // return { error: this.vuelidate?.$error };
      return { error: null };
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        // if (this.vuelidate) this.vuelidate.$touch();
        this.$emit('altered', value);
      },
    },
  },
};
