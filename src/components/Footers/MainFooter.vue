<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { useRouter } from "vue-router";

const router = useRouter()

</script>

<template>
  <q-footer class="main-footer__wrapper">
    <div class="block-container">
      <router-link :to="{name: 'main-page'}">
        <img
          src="/icons/logo.svg"
          alt="logo"
        >
      </router-link>
      <div class="main-footer__links">
        <router-link :to="{name: 'advertiser-page'}">
          Рекламодателям
        </router-link>
        <router-link :to="{name: 'sp-offers-page'}">
          [SP] Офферы
        </router-link>
      </div>
      <p class="main-footer__text">
        <span @click="router.push({name: 'main-page', hash: '#highRisk'})">Технологические преимущества Pay-market </span>
        <span @click="router.push({name: 'high-risk-page'})">Принимайте платежей для High Risk проектов.</span>
      </p>
      <div>
        <DefaultBtn
          @click="router.push({name: 'auth-user-page'})"
        >
          Войти в систему
        </DefaultBtn>
      </div>
    </div>
  </q-footer>
</template>

<style lang="scss">
    .main-footer {
        &__wrapper{
            padding: 0 10px;
            > div {
                padding-top: 40px;
                padding-bottom: 20px;
                display: flex;
                align-items: start;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 40px 15px;

                @media (max-width: 775px) {
                    justify-content: space-evenly;
                }
                @media (max-width: 490px) {
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                button {
                    padding: 10px 20px;
                }

                 > p {
                    color: #a5a5a7;
                     cursor: pointer;
                }
            }
        }

        &__text{
            margin-top: 7px;
            max-width: 300px;
        }

        &__links{
            display: flex;
            flex-direction: column;
            margin-top: 7px;
            a {
                text-decoration: none;
                color: #a5a5a7;
                margin-bottom: 5px;
            }
        }
    }

    .q-layout__section--marginal.main-footer__wrapper{
        background: #1E1B2E;
    }
</style>