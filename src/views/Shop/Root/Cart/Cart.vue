<script src="./Cart.js"></script>
<i18n src="./Cart.txt"></i18n>

<template>
  <h1>{{ t('cart') }}</h1>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <pre v-else></pre>
  <div>
    <div>
      <!-- <h2>{{ t('cart') }}</h2> -->
      <h1>{{ JSON.stringify(cart, undefined, 2) }}</h1>
    </div>
    <button>{{ t('addItem') }}</button>
    <button>{{ t('checkout') }}</button>
  </div>
</template>
