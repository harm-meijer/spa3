<script src="./Products.js"></script>

<template>
  <h1>Cart</h1>
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
