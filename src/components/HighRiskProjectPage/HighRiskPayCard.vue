<script setup>

</script>

<template>
  <div class="high-risk__card block-container">
    <q-card>
      <h2>
        Мы принимаем платежи
        с международных карт
      </h2>
      <p>
        Получай платежи с карт со всего мира и настраивай списание в нужной валюте
      </p>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.high-risk{
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

    @media (max-width: 490px){
        &__card .q-card {
            margin-top: 40px;

            h2 {
                font-size: 24px;
            }

            p {
                font-size: 16px;
            }
        }
    }
}

.high-risk__card .q-card{
    border-radius: 22px;
}
</style>