<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { useRouter } from "vue-router";
import { inject, onMounted, ref } from "vue";
import { useMainStore } from "@/core/stores/index.js";
import { errorNotify } from "@/utils/errorNotify.js";

defineProps({
    showBtn: {
        required: false,
        type: Boolean,
        default: false,
    },
});

const $http = inject("$http");
const user = useMainStore().getUser;
const router = useRouter();

const totalBalance = ref(["0", "00"]);
const holdBalance = ref(["0", "00"]);

onMounted(async () => {
    const { error, data, status } = await $http.getUserBalance(user.id);

    if (status) {
        totalBalance.value = data.balance.split(".");
        holdBalance.value = data.hold.split(".");
    } else {
        console.error("Error: " + error);
        errorNotify();
    }
});
</script>

<template>
  <div class="wallet-preview__wrapper">
    <div class="wallet-preview__content">
      <div class="wallet-preview__item">
        <span class="wallet-preview__icon">
          <i class="pm-wallet" />
        </span>
        <div>
          <p class="wallet-preview__item-title">
            Всего доступно
          </p>
          <p class="wallet-preview__item-text">
            <span class="white-text">{{ totalBalance[0] }}.</span>{{ totalBalance[1] }} ₽
          </p>
        </div>
      </div>
      <div class="wallet-preview__item">
        <span class="wallet-preview__icon">
          <i class="pm-curved" />
        </span>
        <div>
          <p class="wallet-preview__item-title">
            Холд
          </p>
          <p class="wallet-preview__item-text">
            <span>{{ holdBalance[0] }}.</span>{{ holdBalance[1] }} ₽
          </p>
        </div>
      </div>
    </div>
    <div class="wallet-preview__wrapper-btn">
      <default-btn
        v-if="showBtn"
        class="wallet-preview__btn"
        @click="router.push({name: 'user-finance'})"
      >
        Перейти в кошелек
      </default-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wallet-preview {
    &__wrapper {
        margin-top: 71px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 25px 25px;
        border-radius: 22px;
        background: rgb(30, 27, 46);
        padding: 51px 51px 51px 46px;
        flex-wrap: wrap;
    }

    &__content {
        display: flex;
        gap: 25px 30px;
        flex-wrap: wrap;
    }

    &__item {
        display: flex;
        align-items: center;

        p {
            margin-bottom: 0;
        }
    }
    &__icon{
        width: 58px;
        height: 58px;
        background: red;
        display: flex;
        border-radius: 38px;
        background: rgb(59, 56, 76);
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    &__item-title{
        Scolor: rgb(249, 0, 66);
        Sfont-size: 14px;
        Sfont-weight: 400;
        Sline-height: 16px;
        Stext-align: left;
    }
    &__item-text{
        color: #bcbbc1;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        text-align: left;
        & span {
            font-size: 32px;
            font-weight: 700;
            line-height: 38px;
            color: #ffffff;
        }
    }
    &__btn{
        padding: 10px 10px;
        margin: auto;
    }
    @media (max-width: 880px) {
        &__wrapper{
            justify-content: center;
        }
        &__wrapper-btn {
            max-width: 100%;
            width: 100%;
            text-align: center;
        }
        &__content{
            justify-content: center;
        }
    }
    @media (max-width: 525px) {
        &__wrapper{
            margin-top: 17px;
            padding: 30px 10px;
        }
        &__icon{
            width: 37px;
            height: 37px;
        }
        &__item-title{
            font-size: 11px;
            font-weight: 400;
            line-height: 11px;
        }
        &__item-text{
            font-size: 22px;
            line-height: 10px;
            span {
                font-size: 22px;
                line-height: 25px;
            }
        }
    }
}
</style>