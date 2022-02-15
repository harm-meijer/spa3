<script src="./Cart.js"></script>
<i18n src="./Cart.json"></i18n>

<template>
  <h1>{{ t('cart') }}</h1>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <pre v-else></pre>
  <div>
    <div>
      <!-- <h2>{{ t('cart') }}</h2> -->
      <pre>{{ JSON.stringify(cart, undefined, 2) }}</pre>
    </div>
  </div>
</template>
