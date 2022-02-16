<script src="./Product.js"></script>

<template>
  <h1>Cart</h1>
  <select value="sku">
    <option
      v-for="value in [
        'M0E20000000EAT6',
        'M0E20000000EATA',
        'M0E20000000DX1Y',
        'M0E20000000DX2E',
      ]"
      :value="value"
      :key="value"
    ></option>
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
