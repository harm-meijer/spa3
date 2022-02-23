<script src="./Products.js"></script>

<template>
  <ProductList
    :formatProduct="formatProduct"
    :setPage="setPage"
    :page="page"
    :pageSize="pageSize"
    :products="products"
    :total="total"
    :loading="loading"
    :error="error"
    :addToCart="addToCart"
  />
</template>
