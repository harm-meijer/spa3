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
            <!-- :vuelidate="$v.form.firstName" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.firstName"
              @altered="(v) => change('firstName', v)"
              :label="t('firstName')"
              type="text"
              autocomplete="fname"
              data-test="signup-form-firstname"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <!-- :vuelidate="$v.form.lastName" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.lastName"
              @altered="(v) => change('lastName', v)"
              :label="t('secondName')"
              type="text"
              autocomplete="lname"
              data-test="signup-form-lastname"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 sin-login-register">
            <!-- :vuelidate="$v.form.email" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.email"
              @altered="(v) => change('email', v)"
              :label="t('email')"
              type="email"
              autocomplete="username"
              data-test="signup-form-email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <!-- :vuelidate="$v.form.password" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.password"
              @altered="(v) => change('password', v)"
              :label="t('password')"
              type="password"
              autocomplete="off"
              data-test="signup-form-password"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <!-- :vuelidate="$v.form.repeatPassword"
              :customErrors="{ sameAsPassword: t('repeatPasswordError') }" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.repeatPassword"
              @altered="(v) => change('repeatPassword', v)"
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
            <!-- :vuelidate="$v.form.agreeToTerms"
              :customErrors="{ mustBeAgreed: t('agreeToTermsError') }" -->
            <BaseInput
              :vuelidate="{}"
              :value="form.agreeToTerms"
              @altered="(v) => change('agreeToTerms', v)"
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
