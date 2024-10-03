<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import PmViewCard from "@/components/ui/PmViewCard.vue";
import { useRouter } from "vue-router";

const router = useRouter()

const cardContent = [
    {title: 'Личный кабинет', text: 'Прозрачная статистика, постоянное совершенствование инструментария под ваши нужды', background: '/images/card-bg-left.png'},
    {title: 'Полезные инструменты', text: 'Не нужно тратить деньги на разработку лендинга, фрейма или витрину – мы сами разрабатываем готовые решения, которые Вам остается лишь применить', background: '/images/card-bg-right.png'},
    {title: 'Лимита заявок нет, совсем нет', text: 'Мы не ограничиваем Вас в их количестве', background: '/images/card-bg-left.png'},
    {title: 'Регулярные выплаты', text: '<span class="pm-text-gradient">Гарантированно.</span> Выплаты осуществляются по запросу, еженедельно или ежемесячно', background: '/images/card-bg-right.png'},
    {title: 'А самое главное - приватность', text: 'Нам не важно, откуда трафик, мы не передаем ваши данные третьим лицам', background: '/images/card-bg-left.png'},
]
</script>

<template>
  <div class="sp-offers-advatage-cards__wrapper">
    <div class="sp-offers-advatage-cards__content block-container">
      <div>
        <PmViewCard
          v-for="card of cardContent"
          :key="card.title"
          :title="card.title"
          :text="card.text"
          :bg-card="card.background"
          class="sp-offers-advatage-cards__card"
        />
      </div>
      <DefaultBtn
        :border="false"
        class="sp-offers-advatage-cards__btn"
        @click="router.push({name: 'auth-user-page'})"
      >
        Начать лить
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
    .sp-offers-advatage-cards{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;
        }
        &__content{
            text-align: center;

            > div {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 35px 43px;
                margin-bottom: 60px;
            }
        }
        &__card{
            max-width: 348px;
            flex: 1 0 300px;
            height: 290px;
            width: 100%;

            h3 {
                max-width: 200px;
            }

            p {
                font-size: 16px;
                max-width: 250px;
            }
        }
        &__btn{
            padding: 20px 45px;
        }
        
        @media (max-width: 490px) {
            &__wrapper{
                margin-top: 40px;
            }
            &__content{
                > div{
                    gap: 15px;
                    p{
                        font-size: 14px;
                    }
                }
            }
            &__card{
                height: 220px;
            }
        }
    }

    .q-card.sp-offers-advatage-cards__card{
        border-radius: 22px;
    }
</style>