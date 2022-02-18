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
    <a
      href="javascipt:void"
      v-on:click.prevent="setPage(1)"
    >
      page 1
    </a>
    <a
      href="javascipt:void"
      v-on:click.prevent="setPage(2)"
    >
      page 2
    </a>
    <pre>{{
      JSON.stringify({ products, total }, undefined, 2)
    }}</pre>
  </div>
</template>
