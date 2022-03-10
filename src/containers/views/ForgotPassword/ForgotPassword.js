import CustomerTools from 'containers/components/CustomerTools/CustomerTools.vue';
import ForgotPasswordPresentation from 'presentation/Login/ForgotPassword/ForgotPassword.vue';
import { useRouter } from 'vue-router';
//import resetPassword
export default {
  components: {
    CustomerTools,
    ForgotPasswordPresentation,
  },
  setup() {
    const router = useRouter();
    const gotoResetToken = (token) =>
      router.push({
        name: 'reset-password',
        params: { token },
      });
    return { gotoResetToken };
  },
};
