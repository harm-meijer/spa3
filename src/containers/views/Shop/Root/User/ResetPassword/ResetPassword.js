import ResetPasswordPresentation from 'presentation/ResetPassword/ResetPassword.vue';
import CustomerTools from 'containers/components/CustomerTools/CustomerTools.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    ResetPasswordPresentation,
    CustomerTools,
  },
  setup() {
    const router = useRouter();
    const gotoLogin = () =>
      router.push({
        name: 'login',
      });
    return {
      gotoLogin,
    };
  },
  // validations: {
  //   newPassword: { required },
  //   confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
  // },
};
