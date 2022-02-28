<script src="./Cart.js"></script>

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
