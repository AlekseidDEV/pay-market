<script setup>

</script>

<template>
  <div class="sp-offers-play-btn__wrapper">
    <span class="sp-offers-play-btn__play-btn">
      <span class="play" />
    </span>
  </div>
</template>

<style lang="scss">
.sp-offers-play-btn{
    &__play-btn{
        cursor: pointer;
        height: 90px;
        width: 90px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(90deg, #A855F7 0%, #EC4899 100%);
        position: relative;

        &::before,
        &::after{
            position: absolute;
            content: '';
            border: 2px solid #4058DD;
            left: -25px;
            opacity: 0;
            right: -25px;
            top: -25px;
            bottom: -25px;
            border-radius: 50%;
            animation: pulse 2.5s linear infinite;
        }

        &:before{
            border-left: none;
            border-bottom: none;
        }
        &::after{
            border-right: none;
            border-top: none;
            animation-delay: 0.9s;
        }
        .play{
            background: url("/icons/play-button.svg") no-repeat center/cover;
            width: 24px;
            height: 24px;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(0.6);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1.2);
            opacity: 0;
        }
    }
}
</style>