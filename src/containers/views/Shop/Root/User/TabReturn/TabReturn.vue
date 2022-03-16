<i18n src="./TabReturn.txt" lang="yaml"></i18n>
<script src="./TabReturn.js"></script>
<style lang="scss" src="./TabReturn.scss"></style>

<template>
  <div class="myaccount-content">
    <div v-if="order">
      <h3>{{ t('title') }}</h3>
      <div class="mt-40">
        <CartLikeContentDetail
          :editable="false"
          :selectable="true"
          :cart="order"
          @update-selected-items="updateSelectedItems"
        />
      </div>
      <button
        @click="submitReturn"
        class="mt-20"
        data-test="return-submit"
      >
        {{ t('return') }}
      </button>
    </div>
    <div class="pt-50 pb-55" v-if="!loading && !order">
      <h1 class="text-center">{{ t('notFound') }}</h1>
    </div>
    <!-- @todo: do not have modal implemented in this way -->
    <div
      v-if="false"
      name="returnSuccess"
      width="600"
      height="250"
      @closed="closeModal"
      data-test="return-modal"
    >
      <div class="modal-body text-center return-modal">
        <h2>{{ t('modalText') }}</h2>
        <button
          @click="closeModal"
          class="mt-30"
          data-test="close-button"
        >
          {{ t('close') }}
        </button>
      </div>
    </div>
  </div>
</template>

