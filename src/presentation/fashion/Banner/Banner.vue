<script src="./Banner.js" />
<i18n src="./Banner.txt" lang="yaml"></i18n>

<template>
  <transition name="slide-fade" appear>
    <vueper-slides
      autoplay
      class="slider-area"
      :arrows="false"
      :pause-on-hover="false"
      :fade="true"
      :bulletsOutside="true"
    >
      <vueper-slide v-for="i of 2" :key="i">
        <template v-slot:content>
          <div
            class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
            :style="`background-image:url(${require(`presentation/assets/img/banner${i}.jpg`)});`"
          >
            <div class="container">
              <div
                class="row height-100-percent align-items-center"
              >
                <div
                  class="col-lg-12 col-md-12 col-sm-12 col-12"
                >
                  <div
                    class="slider-content-8 slider-animated-1 text-center"
                  >
                    <!--<h3 class="animated">{{t("midSeasonSale")}}</h3>
                <h1 class="animated">{{t("up50")}}</h1>-->
                    <h3 class="animated">
                      <!--{{ h3Message }} -->
                      Mockup test message
                    </h3>
                    <!-- <h1 class="animated">
                    {{ h1Message }}
                  </h1>
                  <div class="slider-btn-1">
                    <router-link
                      :to="{ name: 'home' }"
                      class="animated"

                      {{ bttnText }}</router-link
                    >-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </transition>
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
