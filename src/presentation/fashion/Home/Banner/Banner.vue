<script src="./Banner.js" />

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
        :h3Message="slide.h3Message"
        :h1Message="slide.h1Message"
      >
      </BannerSlide>
    </Slide>

    <!-- addons -->
    <template #addons> </template>
  </carousel>
</template>
