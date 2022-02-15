<script src="./Root.js" />


<template>
  <template v-if="paramsSet">
    <router-view name="header" />
    <router-view />
    <router-view name="footer" />
  </template>
</template>
