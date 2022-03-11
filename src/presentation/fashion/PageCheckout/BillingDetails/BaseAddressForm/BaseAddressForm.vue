<i18n src="./BaseAddressForm.txt" lang="yaml"></i18n>
<script src="./BaseAddressForm.js"></script>

<template>
  <div class="row">
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('firstName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.firstName" -->
        <input
          v-model="v$.form.firstName.$model"
          type="text"
          data-test="address-form-firstName"
        />
      </div>
      <div
        v-for="error of v$.form.firstName.$silentErrors"
        :key="error.$message"
        :invalid="true"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('lastName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate
        :vuelidate="$v.form.lastName" -->
        <input
          v-model="v$.form.lastName.$model"
          type="text"
          data-test="address-form-lastName"
        />
      </div>
      <div
        v-for="error of v$.form.lastName.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>

    <div class="col-lg-12">
      <div class="billing-info mb-25">
        <label>
          {{ t('address') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.streetName" -->
        <input
          class="billing-address"
          v-model="v$.form.streetName.$model"
          :placeholder="t('streetName')"
          type="text"
          data-test="address-form-streetName"
        />
        <div
          v-for="error of v$.form.streetName.$silentErrors"
          :key="error.$message"
        >
          <div>{{ error.$message }}</div>
        </div>
        <input
          v-model="form.additionalStreetInfo"
          :placeholder="t('additional')"
          type="text"
          data-test="address-form-additionalStreetInfo"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('postCode') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.postalCode" -->
        <input
          v-model="v$.form.postalCode.$model"
          type="text"
          data-test="address-form-postalCode"
        />
      </div>
      <div
        v-for="error of v$.form.postalCode.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('city') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.city" -->
        <input
          v-model="v$.form.city.$model"
          type="text"
          data-test="address-form-city"
        />
      </div>
      <div
        v-for="error of v$.form.city.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-12" style="display: none">
      <div class="billing-select mb-25">
        <label>
          {{ t('country') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.country" -->
        <!-- country is set in useCartMutation -->
        <!-- <select v-model="form.country" class="select">
          <option
            v-for="country in countries"
            :value="country.id"
            :key="country.id"
          >
            {{ country.name }}
          </option>
        </select> -->
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('phone') }}
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.phone" -->
        <input
          v-model="v$.form.phone.$model"
          type="tel"
          data-test="address-form-phone"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('email') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <!-- @todo: use vuelidate -->
        <!-- :vuelidate="$v.form.email" -->
        <input
          v-model="v$.form.email.$model"
          type="email"
          data-test="address-form-email"
        />
      </div>
      <div
        v-for="error of v$.form.email.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
  </div>
</template>
