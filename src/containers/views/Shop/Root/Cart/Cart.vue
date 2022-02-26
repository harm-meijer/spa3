<script src="./Cart.js"></script>
<i18n src="./Cart.json"></i18n>

<template>
  <CartLike v-slot="cartLike">
    <CartDetail
      :cart="cart"
      :loading="loading"
      :error="error"
      :cartLike="cartLike"
    />
  </CartLike>
</template>
