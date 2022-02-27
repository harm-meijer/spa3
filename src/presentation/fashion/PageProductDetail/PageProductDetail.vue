<i18n src="./PageProductDetail.txt" lang="yaml"></i18n>
<script src="./PageProductDetail.js"></script>

<template>
  <div
    class="product-details-area pt-50 pb-50"
    v-if="currentVariant"
  >
    <div class="custom-container">
      <!-- @todo: add to shopping list
      @open-add-shopping-list="openAddToShoppingList" -->
      <ProductInfo
        :sku="sku"
        :currentVariant="currentVariant"
      />
    </div>
    <!-- <AddToShoppingList
      :showModal="showAddToShoppingList"
      :productSku="sku"
      @close-modal="closeAddToShoppingList"
    /> -->
  </div>
</template>
