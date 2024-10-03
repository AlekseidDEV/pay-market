<script setup>
import PmViewCard from "@/components/ui/PmViewCard.vue";

const cardContent = [
    {text: 'Это возможность профессионально развиваться, участвовать в масштабных и прогрессивных проектах, вместе с нами решать сложные и интересные задачи.', icon: {name: 'rocket_launch', color: '#fc803a', size: '27px'}, background: '/images/card-bg-left.png'},
    {text: 'Мы предоставляем нашим сотрудникам максимум возможностей, все необходимые ресурсы и поддерживаем во всех начинаниях.', icon: {name: 'how_to_reg', color: '#2abd40', size: '27px'}, background: '/images/card-bg-right.png'}
]
</script>

<template>
  <div class="vacancy-info-card__wrapper">
    <div class="block-container">
      <h2>
        Работа в Pay-market
      </h2>

      <div class="vacancy-info-card__items-wrapper">
        <PmViewCard
          v-for="card of cardContent"
          :key="card.text"
          :text="card.text"
          :icon="card.icon"
          :bg-card="card.background"
        />
      </div>

      <p class="vacancy-info-card__description-text">
        Прямо сейчас в нашей компании открыты ключевые позиции, поэтому у нашего будущего коллеги будет возможность не только развить свои профессиональные навыки, но и построить с "0" партнерский канал, сформировать команду, вырасти до Руководителя и повысить свой доход в максимально короткие сроки.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.vacancy-info-card {
    &__wrapper{
        margin-top: 80px;
        text-align: center;
        padding: 0 10px;
        h2 {
            font-size: 35px;
        }
    }
    &__items-wrapper{
        margin-top: 35px;
        margin-bottom: 45px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px 35px;
        > div {
            max-width: 420px;
            height: 380px;
            width: 100%;

            p {
                margin-top: 20px;
                font-size: 18px;
                max-width: 320px;
            }
        }
    }
    &__description-text{
        max-width: 650px;
        margin: auto;
        font-size: 18px;
    }
}
</style>