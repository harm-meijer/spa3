<script src="./Banner.js" />

<template>
  <carousel
    :settings="settings"
    :autoplay="2000"
    :wrap-around="true"
  >
    <slide
      class="slider-area"
      v-for="slide in slides"
      :key="slide.id"
    >
      <BannerSlide
        :h3Message="slide.h3Message"
        :h1Message="slide.h1Message"
      >
      </BannerSlide>
    </slide>

    <!-- addons -->
    <template #addons> </template>
  </carousel>
</template>
