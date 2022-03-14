<script src="./ForgotPassword.js"></script>

<template>
  <CustomerTools v-slot="tools">
    <ForgotPasswordPresentation
      :tools="tools"
      :gotoResetToken="gotoResetToken"
    />
  </CustomerTools>
</template>
