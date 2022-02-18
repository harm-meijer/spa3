<script src="./Product.js"></script>

<template>
  <h1>Product Detail</h1>
  <select
    :value="sku"
    v-on:change="(e) => changeSKU(e.target.value)"
  >
    <option
      v-for="value in skus"
      :value="value"
      :key="value"
    >
      {{ value }}
    </option>
  </select>

  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <button v-on:click="() => changeLine(sku, 1)">
      Add to cart
    </button>
    <pre>{{
      JSON.stringify({ product, total }, undefined, 2)
    }}</pre>
  </div>
</template>
