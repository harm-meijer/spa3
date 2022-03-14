<script src="./ResetPassword.js"></script>

<template>
  <CustomerTools v-slot="tools">
    <ResetPasswordPresentation
      :tools="tools"
      :token="token"
      :gotoLogin="gotoLogin"
    />
  </CustomerTools>
</template>
