<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="main-goodidea-card__wrapper">
    <q-card class="block-container main-goodidea-card__idea-card">
      <div class="main-goodidea-card__text-content">
        <h2>
          Есть отличная идея?
        </h2>
        <p>Зарегистрируйтесь и заработайте на финансовом трафике!</p>
        <DefaultBtn
          bg-color="dark"
          @click="router.push({name: 'auth-user-page'})"
        >
          Войти в систему
        </DefaultBtn>
      </div>
      <div class="main-goodidea-card__qr-code">
        <img
          src="/images/qr.png"
          alt="img"
        >
        <div>
          <p>
            Мы всегда готовы к сотрудничеству, напишите нам!
          </p>
          <a
            href="https://t.me/nik_gor86"
            target="_blank"
          >
            <i class="pm-telegram" />
          </a>
        </div>
      </div>
    </q-card>
  </div>
</template>

<style lang="scss">
    .main-goodidea-card{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;
            @media (max-width: 490px) {
                margin-top: 40px;
            }
        }
        &__idea-card{
            border-radius: 22px;
            background: url("/images/ideacardBg.png") no-repeat center;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            gap: 20px 10px;
        }
        &__text-content{
            h2 {
                font-size: 30px;
                margin-bottom: 15px;
                line-height: 120%;
            }
            p {
                font-size: 20px;
                max-width: 400px;
                width: 100%;
            }
            button {
                margin-top: 30px;
                padding: 15px 40px;
            }
        }
        &__qr-code{
            img {
                margin-bottom: 20px;
            }
            > div {
                display: flex;
                align-items: center;
                gap: 5px 15px;
                flex-wrap: wrap;
            }
            p {
                font-size: 20px;
                max-width: 300px;
            }
            a{
                background: #100e19;
                border-radius: 15px;
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    color: white;
                }
            }
        }
        
        @media (max-width: 600px) {
            &__idea-card{
                flex-direction: column;
            }
            &__text-content{
                text-align: center;
            }
            &__qr-code{
                text-align: center;
            }
        }
        @media (max-width: 445px){
            &__text-content {
                h2 {
                    font-size: 24px;
                }
                p {
                    font-size: 14px;
                }
                button {
                    margin-top: 10px;
                }
            }
            &__qr-code{
                > div {
                    justify-content: center;
                }
                p {
                    font-size: 14px;
                }
            }
        }
    }

    .q-card.main-goodidea-card__idea-card{
        padding: 20px;
        border-radius: 22px;
        background: url("/images/ideacardBg.png") no-repeat center/cover;
    }
</style>