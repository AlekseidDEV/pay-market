<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="high-risk-promo__wrapper">
    <div class="high-risk-promo__content block-container">
      <h1>
        Приём платежей
        для <span>
          High Risk
        </span> проектов
      </h1>
      <p>
        Специализируемся на обработке мультивалютных платежей для высоко-рисковых бизнесов - High Risk Merchant Services. Мы предоставляем широкий спектр услуг для практически любых высоко-рисковых сервисов, включая возможность принимать платежи через криптовалюты и банковские карты.
      </p>
      <DefaultBtn
        class="high-risk-promo__btn"
        @click="router.push({hash: '#form-accept-pay'})"
      >
        Регистрация
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
.high-risk-promo{
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
            max-width: 460px;
            line-height: 130%;
            margin-bottom: 40px;
            span {
                font-size: inherit;
                background: linear-gradient(90deg, #A855F7 0%, #EC4899 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: transparent;
                font-weight: 800;
                position: relative;
                &::after{
                    position: absolute;
                    content: '';
                    top: 30px;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url("/icons/high-risk-lines.svg") no-repeat center;
                }
            }
        }

        p{
            color: #8c8c8e;
            max-width: 550px;
            margin-bottom: 25px;
            font-size: 20px;
        }
    }
    &__btn{
        padding: 15px 40px;
    }
    &__card{
        padding: 0 10px;
        .q-card {
            margin-top: 80px;
            background: url("/images/fon-card2.png") no-repeat center/cover;
            padding: 80px 30px;
            h2 {
                font-size: 35px;
                max-width: 500px;
                line-height: 120%;
            }
            p{
                margin-top: 15px;
                font-size:18px;
                max-width: 500px;
            }
        }
    }

    @media (max-width: 490px) {
        &__wrapper{
            padding: 100px 10px;
        }
        &__content{
            h1 {
                font-size: 24px;
                margin-bottom: 15px;
                span {
                    &::after{
                        background: transparent;
                    }
                }
            }
            p{
                font-size: 14px;
            }
        }
    }
}
</style>