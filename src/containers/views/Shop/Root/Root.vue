<script src="./Root.js" />

<template>
  <div
    v-if="paramsSet"
    class="main-wrapper main-wrapper-2 main-wrapper-3"
    :class="isMiniCartOpen ? 'overlay-active' : ''"
  >
    <div @click="close()" class="body-overlay"></div>
    <!-- @todo: gray overlay when minicart is open does not show -->
    <MiniCart />
    <router-view name="header" />
    <router-view />
    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>
