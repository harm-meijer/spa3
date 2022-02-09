<script src="./Products.js"></script>

<template>
  <h1>Cart</h1>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <pre v-else>
    {{ JSON.stringify({ products, total }, undefined, 2) }}
  </pre>
</template>
