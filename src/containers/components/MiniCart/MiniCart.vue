<script src="./MiniCart.js"></script>

<template>
  <CartLike v-slot="cartLike">
    <MiniCartPresentation
      :cartLike="cartLike"
      :cart="cart"
      :loading="loading"
      :error="error"
      :open="open"
      :close="close"
      :isOpen="isOpen"
    />
  </CartLike>
</template>
