<script src="./BannerSlide.js" />
<style src="./BannerSlide.scss" lang="scss"></style>
<i18n src="./Banner.txt" lang="yaml"></i18n>

<template>
  <div
    class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
    :style="`background-image:url(${require(`presentation/assets/img/${bannerImage}`)});`"
  >
    <div class="container">
      <div
        class="row height-100-percent align-items-center"
      >
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div
            class="slider-content-8 slider-animated-1 text-center"
          >
            <!--<h3 class="animated">{{$t("midSeasonSale")}}</h3>
                <h1 class="animated">{{$t("up50")}}</h1>-->
            <h3 class="animated">
              {{ h3Message }}
            </h3>
            <h1 class="animated">
              {{ h1Message }}
            </h1>
            <div class="slider-btn-1">
              <router-link
                :to="{ name: 'home' }"
                class="animated"
                ><!--{$t("shopNow")}}-->
                {{ bttnText }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
