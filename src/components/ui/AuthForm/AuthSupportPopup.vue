<script setup>
  import {ref} from "vue";
  import {onClickOutside} from "@vueuse/core";

  const popupRef = ref(null)
  let isShowPopup = ref(false)

  onClickOutside(() => isShowPopup.value = false)
</script>

<template>
  <div class="popup">
    <p
      class="not-msg"
      @click="isShowPopup = !isShowPopup"
    >
      Не приходжит СМС
    </p>
    <transition>
      <div
        v-if="isShowPopup"
        ref="popupRef"
        class="popup__wrapper"
      >
        <span class="triangle" />
        <p class="popup__text-messeg">
          Возможно вы используете номер телефона, отличающийся от указанного в личном кабинете.
        </p>

        <p class="popup__text-messeg">
          Вы можете обратиться за помощью в службу <span>поддержки</span>
        </p>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="scss">

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.not-msg {
  color: rgb(249, 0, 66);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
}

.popup {
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 477px;
  width: 100%;

  &__wrapper {
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 17px;
    border: 1px solid rgb(91, 91, 91);
    background: rgb(16, 14, 25);
    width: 100%;
    padding: 32px 45px;
    z-index: 10;
    & span.triangle{
      width: 49px;
      height: 51px;
      position: absolute;
      top: -37px;
      transform: translateX(-50%);
      left: 50%;
      background: url('../../../../public/icons/polygon.svg') no-repeat center;
    }
  }
  &__text-messeg{
    text-align: center;
    & span {
      color: rgb(249, 0, 66);
    }
  }
}
</style>