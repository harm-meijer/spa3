<script src="./Banner.js" />
<i18n src="./Banner.txt" lang="yaml"></i18n>

<template>
  <div
    class="slider-area"
    v-for="slide in slides"
    :key="slide.id"
  >
    <transition name="slide-fade" appear>
      <BannerSlide
        :bannerImage="slide.bannerImage"
        :h3Message="t(slide.h3Message)"
        :h1Message="t(slide.h1Message)"
        :bttnText="t(slide.bttnText)"
      >
      </BannerSlide>
    </transition>
  </div>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
