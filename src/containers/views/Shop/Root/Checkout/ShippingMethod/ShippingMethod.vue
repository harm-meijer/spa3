<script src="./ShippingMethod.js"></script>

<template>
  <ShippingMethodPresentation
    :total="total"
    :loading="loading"
    :error="error"
    :shippingMethods="shippingMethods"
    :price="price"
    :selectedShippingMethod="selectedShippingMethod"
    :setSelectedShippingMethod="setSelectedShippingMethod"
  />
</template>
