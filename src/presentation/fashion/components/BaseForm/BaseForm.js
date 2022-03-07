import { shallowRef } from 'vue';

export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = shallowRef(null);
    const error = shallowRef(null);
    function submit() {
      //@todo:implement vuelidate (should be in props)
      // this.vuelidate.$touch();
      error.value = null;
      // if (!this.vuelidate.$invalid) {
      // eslint-disable-next-line no-constant-condition
      if (true) {
        state.value = 'loading';
        return props
          .onSubmit()
          .then(() => {
            state.value = 'success';
          })
          .catch((e) => {
            error.value = e;
            state.value = null;
          });
      }
    }
    return { state, error, submit };
  },
};
