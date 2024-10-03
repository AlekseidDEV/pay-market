<script setup>

</script>

<template>
  <div class="sp-offers-describe-card__wrapper">
    <q-card class="sp-offers-describe-card__content block-container">
      <h2>Что такое <span class="text-red-13">[SP] офферы?</span></h2>
      <p>
        В арбитраже [SP] оффер — это оплата за подписку на продукт или услугу,
        которая делится на несколько частей и выдается клиенту поэтапно.
      </p>
      <span class="text-red-13">SP — Subscription Payment (Оплата за подписку)</span>
    </q-card>
  </div>
</template>

<style lang="scss">

.sp-offers-describe-card{
    &__wrapper{
        padding: 0 10px;
        margin-top: 80px;
    }
    &__content{
        text-align: center;
        h2 {
            font-size: 40px;
            line-height: 130%;
            span {font-size: inherit}
        }
        p{
            max-width: 500px;
            margin: 25px auto 25px auto;
            color: white;
            font-size: 18px;
        }
        > span {
            font-size: 18px;
        }
    }
    
    @media (max-width: 490px) {
        &__wrapper{
            margin-top: 40px;
        }
        &__content{
            h2 {
                font-size: 25px;
            }
            p{
                font-size: 14px;
            }
            > span {
                font-size: 14px;
            }
        }
    }
}

    .q-card.sp-offers-describe-card__content{
        border-radius: 22px;
        padding: 30px 10px;
        position: relative;
        z-index: 1;
        &::after{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("/images/ideacardBg.png") no-repeat center/cover;
            border-radius: 22px;
            z-index: -1;
            opacity: 0.4;
        }
    }
</style>