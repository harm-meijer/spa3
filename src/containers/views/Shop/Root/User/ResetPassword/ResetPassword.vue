<script src="./ResetPassword.js"></script>

<template>
  <CustomerTools v-slot="tools">
    <ResetPasswordPresentation
      :tools="tools"
      :gotoLogin="gotoLogin"
    />
  </CustomerTools>
</template>
