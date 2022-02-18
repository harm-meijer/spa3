<script src="./Product.js"></script>

<template>
  <h1>Product Detail</h1>
  sku:<select
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
  channel:
  <select
    :value="channel"
    v-on:change="(e) => setChannel(e.target.value)"
  >
    <option value="">none</option>
    <option value="3ebb7c58-eb09-41c9-b751-57fe5089c128">
      Munich
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
