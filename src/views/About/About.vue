<style src="./About.scss" lang="scss" scoped></style>
<!-- <i18n src="./About.txt"></i18n> -->
<script src="./About.js"></script>

<template>
  <h1 class="test">
    <p>About should have red background</p>
    Here shouldn't have red background
    <p>Here should have red background again.</p>
  </h1>

  <!-- this should say thankyou in the app language -->
  <!-- <h2>{{ $t('thankYou') }}</h2> -->
</template>
