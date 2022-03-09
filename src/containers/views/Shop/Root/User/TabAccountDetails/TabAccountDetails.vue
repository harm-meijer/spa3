<i18n src="./TabAccountDetails.txt" lang="yaml"></i18n>
<script src="./TabAccountDetails.js"></script>
<style src="./TabAccountDetails.scss" lang="scss" scope></style>

<template>
  <div class="myaccount-content">
    <h3>{{ t('title') }}</h3>
    <div class="account-details-form">
      <!-- @todo: implement vuelidate -->
      <BaseForm
        :onSubmit="updateCustomerProfile"
        :vuelidate="{}"
        #default="{ error }"
      >
        <div class="row">
          <div class="col-lg-6">
            <div class="single-input-item">
              <label for="first-name" class="required">{{
                t('firstName')
              }}</label>
              <BaseInput
                v-model="form.firstName"
                :vuelidate="{}"
                type="text"
                id="first-name"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="single-input-item">
              <label for="last-name" class="required">{{
                t('lastName')
              }}</label>
              <BaseInput
                v-model="form.lastName"
                :vuelidate="{}"
                type="text"
                id="last-name"
              />
            </div>
          </div>
        </div>
        <div class="single-input-item pt-30">
          <label for="email" class="required">{{
            t('email')
          }}</label>
          <BaseInput
            v-model="form.email"
            :vuelidate="{}"
            type="email"
            id="email"
          />
        </div>
        <div class="single-input-item pt-30">
          <!-- :disabled="$v.$invalid" -->
          <!-- :class="$v.$invalid ? 'disabled' : ''" -->
          <button type="submit" class="check-btn sqr-btn">
            {{ t('saveBtn') }}
          </button>
        </div>
        <ServerError :error="error" class="server-error">{{
          'unknownError'
        }}</ServerError>
      </BaseForm>
    </div>
  </div>
</template>
