<style src="./SignUpForm.scss" lang="scss"></style>
<i18n src="./SignUpForm.txt" lang="yaml"></i18n>
<script src="./SignUpForm.js"></script>

<template>
  <div class="login-register-wrap register-wrap">
    <h3>{{ t('title') }}</h3>
    <!-- <BaseForm :vuelidate="$v" :onSubmit="customerSignMeUp" #default="{ error }"> -->
    <form @submit.prevent="customerSignMeUp">
      <ServerError :error="error" v-slot="{ graphQLError }">
        {{ getErrorMessage(graphQLError) }}
      </ServerError>
      <div class="login-register-form">
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <!-- <BaseInput
              :vuelidate="$v.form.firstName" -->
            <input
              v-model="form.firstName"
              :label="t('firstName')"
              type="text"
              autocomplete="fname"
              data-test="signup-form-firstname"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <!-- <BaseInput
              :vuelidate="$v.form.lastName" -->
            <input
              v-model="form.lastName"
              :label="t('secondName')"
              type="text"
              autocomplete="lname"
              data-test="signup-form-lastname"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 sin-login-register">
            <!-- <BaseInput
              :vuelidate="$v.form.email" -->
            <input
              v-model="form.email"
              :label="t('email')"
              type="email"
              autocomplete="username"
              data-test="signup-form-email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <!-- <BaseInput
              :vuelidate="$v.form.password" -->
            <input
              v-model="form.password"
              :label="t('password')"
              type="password"
              autocomplete="off"
              data-test="signup-form-password"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <!-- <BaseInput
              :vuelidate="$v.form.repeatPassword"
              :customErrors="{ sameAsPassword: t('repeatPasswordError') }" -->
            <input
              v-model="form.repeatPassword"
              :label="t('repeatPassword')"
              type="password"
              autocomplete="off"
              data-test="signup-form-repeatpassword"
            />
          </div>
        </div>
        <!--<div class="signup-box-newsletter">-->
        <!--<input type="checkbox" name="joinNewsletter" value="true" -->
        <!--{{#if form.subscribeToNewsletter}}checked{{/if}}>-->
        <!--<span>{{ t('pleaseAddMe') }} <a href="">{{ t('newsletter') }}</a></span>-->
        <!--</div>-->
        <div class="row">
          <div class="col-sm-12 agree-to-terms">
            <!-- <BaseInput
              :vuelidate="$v.form.agreeToTerms"
              :customErrors="{ mustBeAgreed: t('agreeToTermsError') }" -->
            <input
              v-model="form.agreeToTerms"
              :label="t('agreeTo')"
              type="checkbox"
              autocomplete="off"
              data-test="signup-form-agreetoterms"
            />
          </div>
        </div>
        <div class="login-register-btn">
          <button data-test="signup-form-submit">
            {{ t('registerNow') }}
          </button>
        </div>
      </div>
    </form>
    <!-- </BaseForm> -->
  </div>
</template>
