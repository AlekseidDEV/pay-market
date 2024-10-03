<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SpOffersPlayBtn from "@/components/SpOffersPage/SpOffersPlayBtn.vue";
import SpOffersVideoPopup from "@/components/SpOffersPage/SpOffersVideoPopup.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const isVideoPopup = ref(false)

</script>

<template>
  <div class="sp-offers-promo__wrapper">
    <div class="sp-offers-promo__content block-container">
      <h1>Получай пожизненный доход на <span class="pm-text-gradient">[SP] офферах</span></h1>
      <SpOffersPlayBtn @click="isVideoPopup = true" />
      <SpOffersVideoPopup v-model="isVideoPopup" />
      <p>Посмотрите трейлер одного из наших офферов</p>
      <DefaultBtn
        :border="false"
        @click="router.push({name: 'auth-user-page'})"
      >
        Начать лить
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
    .sp-offers-promo{
        &__wrapper{
            padding: 140px 10px;
            background: url("/images/bg1-web.png") no-repeat center/cover;
        }
        &__content{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            h1 {
                max-width: 600px;
                line-height: 130%;
                margin-bottom: 40px;
            }

            p{
                margin-top: 35px;
                max-width: 280px;
                width: 100%;
                font-size: 18px;
                color: white;
            }

            button{
                margin-top: 15px;
                padding: 18px 40px;
            }
        }
        
        @media (max-width: 490px) {
            &__wrapper{
                padding: 90px 10px;
            }
            &__content{
                h1{
                    font-size: 24px;
                }
                p{
                    font-size: 16px;
                }
            }
        }
    }
</style>