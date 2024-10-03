<script setup>
import PmViewCard from "@/components/ui/PmViewCard.vue";

const cardContent = [
    {text: 'Полное отсутствие холда. Моментальный статус всем лидам', icon: {name: 'bolt', color: '#1440c2', size: '27px'}, background: '/images/card-bg-left.png'},
    {text: 'Пожизненный доход от 50% всех поступивших денег с ваших активных клиентов', icon: {name: 'payments', color: '#726bca', size: '27px'}, background: '/images/card-bg-right.png'},
    {text: 'Срок жизни клиента до одного года. Всё это время вы будете получать проценты', icon: {name: 'percent', color: '#be61ff', size: '27px'}, background: '/images/card-bg-left.png'},
    {text: 'Повышение ставки за качественный трафик', icon: {name: 'query_stats', color: '#5a00a4', size: '27px'}, background: '/images/card-bg-right.png'},
    {text: 'Быстрое добавление landing page и транзитных страниц по требованию', icon: {name: 'note_add', color: '#ff69e7', size: '27px'}, background: '/images/card-bg-left.png'},
    {text: 'Принимается трафик со всего мира, при этом во время оплаты иностранная валюта автоматически конвертируется в RUB', icon: {name: 'currency_exchange', color: '#db25bf', size: '27px'}, background: '/images/card-bg-right.png'}
]
</script>

<template>
  <div class="sp-offers-info-card__wrapper">
    <div class="sp-offers-info-card__content block-container">
      <div class="sp-offers-info-card__cards-wrapper">
        <PmViewCard
          v-for="card of cardContent"
          :key="card.text"
          :text="card.text"
          :icon="card.icon"
          :bg-card="card.background"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
    .sp-offers-info-card{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;
        }

        &__cards-wrapper{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px 43px;

            > div {
                max-width: 348px;
                width: 100%;
                height: 290px;
                flex: 1 0 280px;

                 p {
                     padding: 0 10px;
                    text-align: center;
                     max-width: 280px;
                     font-size: 16px;
                }
            }
        }
        
        @media (max-width: 490px) {
            &__wrapper{
                margin-top: 40px;
            }
        }
    }
</style>