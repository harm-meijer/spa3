<i18n src="./LoginForm.txt" lang="yaml"></i18n>
<script src="./LoginForm.js" lang="yaml"></script>

<template>
  <div class="login-register-wrap">
    <h3>{{ t('signIn') }}</h3>
    <div class="login-register-form">
      <!-- <BaseForm :onSubmit-->
      <!-- :vuelidate="$v" -->
      <!-- #default="{ error }" -->
      <form @submit.prevent="customerSignMeIn">
        <div class="sin-login-register">
          <!-- <BaseInput -->
          <!-- :vuelidate="$v.form.email" -->
          <input
            v-model="form.email"
            :label="t('email')"
            type="email"
            autocomplete="username"
            data-test="login-form-email"
          />
        </div>
        <div class="sin-login-register">
          <!-- <BaseInput -->
          <!-- :vuelidate="$v.form.password" -->
          <input
            v-model="form.password"
            :label="t('password')"
            type="password"
            autocomplete="current-password"
            data-test="login-form-password"
          />
        </div>
        <div class="lost-password mb-20">
          <!-- @todo: make forgot password -->
          <!-- <router-link :to="{ name: 'forgot-password' }">{{
            t('forgotPassword')
          }}</router-link> -->
        </div>

        <div class="login-register-btn-remember">
          <div class="login-register-btn">
            <button data-test="login-form-submit">
              {{ t('signIn') }}
            </button>
          </div>
        </div>
        <ServerError
          class="mb-20"
          :error="error"
          v-slot="{ graphQLError }"
          >{{ getErrorMessage(graphQLError) }}</ServerError
        >
        <!-- </BaseForm> -->
      </form>
    </div>
  </div>
</template>
