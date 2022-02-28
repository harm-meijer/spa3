<script src="./Checkout.js"></script>

<template>
  <CartLike v-slot="cartLike">
    <PageCheckout :cart="cart" :cartLike="cartLike" />
  </CartLike>
</template>
