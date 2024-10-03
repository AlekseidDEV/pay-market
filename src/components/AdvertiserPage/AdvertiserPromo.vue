<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="advertiser-promo__wrapper">
    <div class="advertiser-promo__content block-container">
      <h1>
        Партнерская программа для рекламодателей
      </h1>
      <p>
        Для прямых рекламодателей: <br>
        <span>МФО, банков и кредитных брокеров</span>
      </p>
      <DefaultBtn
        class="advertiser-promo__btn"
        @click="router.push({hash: '#form-registrate'})"
      >
        Отправить заявку
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
    .advertiser-promo{
        &__wrapper{
            padding: 160px 10px;
            background: url("/images/bg1-web.png") no-repeat center/cover;
        }

        &__content{
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            h1 {
                max-width: 750px;
                line-height: 130%;
                margin-bottom: 40px;
            }

            p{
                color: #8c8c8e;
                max-width: 417px;
                margin-bottom: 25px;
                font-size: 16px;
                span {
                    color: #fff;
                    font-size: inherit;
                }
            }
        }
        &__btn{
            padding: 15px 40px;
        }

        @media (max-width: 490px) {
            &__wrapper{
                padding: 100px 0;
            }
            &__content{
                h1 {
                    font-size: 24px;
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>