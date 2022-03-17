import ResetPasswordPresentation from 'presentation/ResetPassword/ResetPassword.vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    ResetPasswordPresentation,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const gotoLogin = () =>
      router.push({
        name: 'login',
      });
    return {
      gotoLogin,
      token: route.params.token,
    };
  },
  // validations: {
  //   newPassword: { required },
  //   confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
  // },
};
