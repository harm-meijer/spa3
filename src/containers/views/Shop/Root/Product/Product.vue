<script src="./Product.js"></script>

<template>
  <PageProductDetail
    :cartActions="cartActions"
    :allVariants="allVariants"
    :currentVariant="currentVariant"
    :product="product"
    :total="total"
    :loading="loading"
    :error="error"
    :changeSKU="changeSKU"
    :sku="sku"
    :skus="skus"
    :store="store"
    :setStore="setStore"
  />
</template>
