<script src="./Banner.js" />
<i18n src="./Banner.txt" lang="yaml"></i18n>

<template>
  <carousel
    :autoplay="4000"
    :wrap-around="true"
    :itemsToShow="1"
  >
    <Slide
      class="slider-area"
      v-for="slide in slides"
      :key="slide.id"
    >
      <BannerSlide
        :bannerImage="slide.bannerImage"
        :h3Message="t(slide.h3Message)"
        :h1Message="t(slide.h1Message)"
        :bttnText="t(slide.bttnText)"
      >
      </BannerSlide>
    </Slide>

    <!-- addons -->
    <template #addons> </template>
  </carousel>
</template>
