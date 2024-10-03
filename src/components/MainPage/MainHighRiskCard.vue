<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <div
    id="highRisk"
    class="main-highrisk-card__wrapper"
  >
    <div class="block-container">
      <q-card>
        <div class="main-highrisk-card__text-content">
          <h2>
            Принимайте платежи для своих
            <span>High Risk</span> проектов
          </h2>

          <p>
            Регулярные платежи по подписке,
            массовые выплаты и автоматический вывод
          </p>

          <DefaultBtn
            :border="false"
            class="main-highrisk-card__btn"
            @click="router.push({name: 'high-risk-page'})"
          >
            Подробнее
          </DefaultBtn>
        </div>
        <div class="main-highrisk-card__img-content">
          <img
            src="/images/highRiskCardImg.png"
            alt="img"
          >
        </div>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
.main-highrisk-card{
    &__wrapper{
        margin-top: 80px;
        padding: 0 10px;
    }

    &__wrapper .q-card {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
    }
    &__text-content{
        position: relative;
        z-index: 1;
        h2 {
            max-width: 410px;
            line-height: 140%;
            width: 100%;
            margin-bottom: 30px;
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
                    width: 100px;
                    height: 5px;
                    background: url("/icons/high-risk-lines.svg") no-repeat center/cover;
                }
            }
        }

        p {
            font-size: 18px;
            max-width: 450px;
            width: 100%;
        }
    }
    &__btn{
        padding: 15px 40px;
    }

    @media (max-width: 945px) {
        &__img-content{
            position: relative;
            height: 321px;
            img {
                position: absolute;
                right: -100px;
                top: 0;
                z-index: 0;
                opacity: 0.2;
            }
        }
    }
    @media (max-width: 490px){
        &__wrapper{
            margin-top: 40px;
        }
    }
}

.main-highrisk-card__wrapper .q-card {
    border-radius: 22px;
}
</style>