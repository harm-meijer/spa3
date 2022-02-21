<script src="./Header.js" />

<template>
  <!-- @todo: need to implement some of these 
    :shoppingLists
    :totalShoppingCartItems
    :showLocationChange
    :toggleMobileMenu
    :toggleMiniCart
    :openMiniCart  
  -->
  <HeaderPresentation
    :shoppingLists="[]"
    :totalShoppingCartItems="0"
    :totalCartItems="totalCartItems"
    :showLocationChange="true"
    :search="search"
    :setSearch="setSearch"
    :toggleMobileMenu="() => 88"
    :toggleMiniCart="() => 88"
    :openMiniCart="() => 88"
    :locations="locations"
    :location="location"
    :setLocation="setLocation"
    :locales="locales"
    :locale="locale"
    :setLocale="setLocale"
  />
</template>

