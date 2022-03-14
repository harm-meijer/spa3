import ResetPasswordPresentation from 'presentation/ResetPassword/ResetPassword.vue';
import CustomerTools from 'containers/components/CustomerTools/CustomerTools.vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    ResetPasswordPresentation,
    CustomerTools,
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
