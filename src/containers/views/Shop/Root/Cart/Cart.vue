<script src="./Cart.js"></script>
<i18n src="./Cart.json"></i18n>

<template>
  <CartDetail
    :cart="cart"
    :loading="loading"
    :error="error"
    :cartNotEmpty="cartNotEmpty"
    :cartActions="cartActions"
  />
</template>
