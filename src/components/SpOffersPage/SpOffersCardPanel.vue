<script setup>

</script>

<template>
  <div class="sp-offers-card-panel__wrapper">
    <div class="sp-offers-card-panel__content block-container">
      <q-card class="sp-offers-card-panel__card">
        <h2>
          Ваш доход <span class="pm-text-gradient">50%</span> <br>
          с каждого клиента
        </h2>
        <p>
          Офферы белые, поэтому вам не придется обходить модерацию сложными
          настройками — просто подключите оффер и запускайте трафик
        </p>
        <span class="text-red-13">ГЛАВНОЕ ОТЛИЧИЕ [SP] ОФФЕРОВ - ВЫ ДЕЛИТЕ ВЕСЬ ДОХОД С НАМИ</span>
      </q-card>
      <q-card class="sp-offers-card-panel__card">
        <h2>Начисляем вам <span class="pm-text-gradient-gold">до 50%</span></h2>
        <p>
          от суммы, которую
          тратит пользователь
        </p>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
    .sp-offers-card-panel{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;

            .q-card{
                border-radius: 22px;
            }
        }

        &__card:first-child{
            padding: 60px 20px;
            position: relative;
            background: #202328;
            margin-bottom: 30px;
            z-index: 1;
            overflow: hidden;
            &::after{
                position: absolute;
                content: '';
                top: 0;
                right: 0;
                width: 600px;
                height: 100%;
                border-radius: 22px;
                background: url(/images/fon-card.png) no-repeat top/cover;
                opacity: 0.9;
                z-index: -1;
            }

            h2 {
                max-width: 220px;
            }

            p{
                margin-top: 30px;
                max-width: 500px;
                font-size: 18px;
                color: white;
            }
            > span {
                display: flex;
                max-width: 380px;
                width: 100%;
                font-size: 16px;
            }
        }
        &__card:last-child{
            background: url("/images/fon-card2.png") no-repeat center/cover;
            padding: 60px 20px;

            h2 {
                font-size: 30px;
                line-height: 130%;
            }
            p{
                color: white;
                margin-top: 35px;
                font-size: 18px;
                max-width: 180px;
            }
        }
        
        @media (max-width: 825px) {
            &__card:first-child{
                &::after{
                    opacity: 0.1;
                }
            }
        }
        @media (max-width: 490px){
            &__wrapper{
                margin-top: 40px;
            }
        }
    }
</style>