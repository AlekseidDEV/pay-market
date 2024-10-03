<script setup>

  import DefaultBtn from "@/components/ui/DefaultBtn.vue";

  import {useRouter} from "vue-router";

  const router = useRouter()
</script>

<template>
  <div>
    <div class="main-page-promo__wrapper">
      <div class="main-page-promo__content block-container">
        <h1 class="main-page-promo__title">
          Монетизируйте свой трафик на <span>финансовых</span> и
          <span>[SP] офферах</span>
        </h1>
        <h3 class="main-page-promo__sub-title">
          Pay-market <span>– CPA сеть, которая платит за целевое действие или по ревшаре</span>
        </h3>
        <DefaultBtn
          class="main-page-promo__btn"
          :border="false"
          @click="router.push({name: 'auth-user-page'})"
        >
          Войти в систему
        </DefaultBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-page-promo {
    &__wrapper{
        padding-top: 100px;
        padding-bottom: 100px;
        margin-bottom: 80px;
        background: url("/images/bg1-web.png") no-repeat center/cover;
    }

    &__content {
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }
    &__btn{
        padding: 20px 45px;
    }
    &__sub-title{
            text-align: center;
            margin: 3rem 0;
            font-size: 22px;
            max-width: 440px;
            span {
              color: #8c8c8e;
              font-size: inherit;
            }
    }
      &__title {
        line-height: 140%;
        max-width: 520px;
        width: 100%;
          text-align: center;

        span {
          font-size: inherit;
          color: #EC4899FF;
        }
      }

    @media (max-width: 490px) {
        &__wrapper{
            padding-top: 35px;
            padding-bottom: 35px;
        }
            &__title{
              font-size: 24px;
            }
            &__sub-title{
              font-size: 20px;
              margin: 20px 0px;
            }
        &__btn{
            padding: 15px 25px;
        }
    }
}
</style>