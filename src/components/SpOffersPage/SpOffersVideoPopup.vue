<script setup>
    const model = defineModel()
</script>

<template>
  <q-dialog
    v-model="model"
    class="sp-offers-video-popup__wrapper"
  >
    <div class="sp-offers-video-popup__content">
      <video
        controls
        autoplay
        playsinline
        preload="metadata"
      >
        <source
          src="/video/video-promo.mp4"
          type="video/mp4"
        >
      </video>
    </div>
  </q-dialog>
</template>

<style lang="scss">
    .sp-offers-video-popup{
        &__content{
            max-width: 560px;
            width: 100%;

            video {
                width: 100%;
            }
        }
    }
</style>