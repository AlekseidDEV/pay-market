<script setup>
const typeTrafficPanel = [
    "Финансовые витрины",
    "Контентные сайты",
    "Брокерский трафик",
    "Контекстная реклама",
    "Продвижение в соц. сетях",
];
</script>

<template>
  <div class="develop-type-source__wrapper">
    <div class="block-container">
      <div class="develop-type-source__type-traffic">
        <h1>
          С какими типами трафика
          мы работаем
        </h1>
        <p>
          Мы строго модерируем вебмастеров перед подключением к офферу, чтобы ваша реклама размещалась только
          на проверенных интернет-ресурсах и соответствовала установленным правилам работы с оффером
        </p>
        <div class="develop-type-source__type-traffic-wrapper">
          <span
            v-for="text of typeTrafficPanel"
            :key="text"
          >
            {{ text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.develop-type-source {
    &__wrapper {
        margin-top: 80px;
        padding: 0 10px;
    }

    &__type-traffic {
        h1 {
            max-width: 650px;
            line-height: 130%;
            margin-bottom: 45px;
        }

        p {
            font-size: 20px;
            max-width: 450px;
            margin-bottom: 35px;
        }
    }

    &__type-traffic-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px 10px;

        @media (max-width: 825px) {
            justify-content: start;
        }

        span {
            border: 1px solid #F90042;
            padding: 15px 25px;
            border-radius: 8px;
        }
    }

    @media (max-width: 490px) {

        &__wrapper {
            margin-top: 40px;
        }

        &__type-traffic {
            h1 {
                font-size: 24px;
                margin-bottom: 15px;
            }

            p {
                font-size: 14px;
            }
        }
    }
}
</style>