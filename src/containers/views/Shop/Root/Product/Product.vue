<script src="./Product.js"></script>

<template>
  <ProductPresentation
    :products="products"
    :total="total"
    :loading="loading"
    :error="error"
    :changeSKU="changeSKU"
    :sku="sku"
    :skus="skus"
  />
</template>
