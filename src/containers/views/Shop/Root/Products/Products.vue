<script src="./Products.js"></script>

<template>
  <h1>Products</h1>
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
    <a
      href="javascipt:void"
      v-on:click.prevent="setSort('newest')"
    >
      newest
    </a>
    <a
      href="javascipt:void"
      v-on:click.prevent="setSort(null)"
    >
      recommended
    </a>
    <a
      href="javascipt:void"
      v-on:click.prevent="setCategory('all')"
    >
      all
    </a>
    <a
      href="javascipt:void"
      v-on:click.prevent="setCategory('men')"
    >
      men
    </a>
    <a
      href="javascipt:void"
      v-on:click.prevent="setCategory('women')"
    >
      women
    </a>
    <select
      :value="search"
      v-on:change="(e) => setSearch(e.target.value)"
    >
      <option value="">none</option>
      <option value="shoes">shoes</option>
      <option value="pants">pants</option>
    </select>
    <pre>{{
      JSON.stringify({ products, total }, undefined, 2)
    }}</pre>
  </div>
</template>
