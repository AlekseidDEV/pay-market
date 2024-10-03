<script setup>

</script>

<template>
  <div class="vacancy-promo__wrapper">
    <div class="vacancy-promo__content block-container">
      <h1>
        Мы открыты для творческих и <span>«заряженных»</span> людей. Даже если не нашли подходящую вакансию
      </h1>
      <a
        href="https://t.me/nik_gor86"
        target="_blank"
        class="vacancy-promo__btn"
      >
        Напишите нам
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.vacancy-promo{
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
            max-width: 650px;
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
            }
        }
    }
    &__btn{
        background: #F90042;
        border-radius: 8px;
        padding: 15px 40px;
        text-decoration: none;
        color: white;
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
        }
    }
}
</style>