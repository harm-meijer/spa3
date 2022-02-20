<script src="./Product.js"></script>

<template>
  <ProductPresentation
    :product="product"
    :total="total"
    :loading="loading"
    :error="error"
    :changeSKU="changeSKU"
    :sku="sku"
    :skus="skus"
    :changeLine="changeLine"
    :store="store"
    :setStore="setStore"
  />
</template>
