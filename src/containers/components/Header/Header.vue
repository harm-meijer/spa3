<script src="./Header.js" />

<template>
  <!-- @todo: need to implement some of these -->
  <HeaderPresentation
    :shoppingLists="[]"
    :totalShoppingCartItems="0"
    :cart="{}"
    :totalCartItems="0"
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

