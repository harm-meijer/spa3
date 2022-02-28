<script src="./Checkout.js"></script>

<template>
  <CartLike v-slot="cartLike">
    <PageCheckout
      :cart="cart"
      :cartLike="cartLike"
      v-if="cart"
    />
  </CartLike>
</template>
