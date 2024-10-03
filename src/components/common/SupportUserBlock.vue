<script setup>

import SupportChatAnimated from "@/components/common/SupportChatAnimated.vue";
</script>

<template>
  <div class="main-support-card__wrapper">
    <div class="main-support-card__content block-container">
      <div>
        <h2>Общайтесь с нами привычным образом</h2>
        <p>
          Сопровождение персональным менеджером с первого дня регистрации
        </p>
        <a
          class="main-support-card__btn"
          href="https://t.me/nik_gor86"
          target="_blank"
        >
          <i class="pm-telegram" />
          <span>Telegram</span>
        </a>
      </div>
      <div>
        <SupportChatAnimated />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
    .main-support-card{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;
            margin-bottom: 35px;
        }
        &__content{
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px 20px;

            > div:first-child{
                h2 {
                    font-size: 40px;
                    line-height: 130%;
                    margin-bottom: 25px;
                    max-width: 400px;
                }

                > p{
                    max-width: 450px;
                    width: 100%;
                    font-size: 22px;
                }
            }
            >  div:last-child {
                flex: 1 0 370px;
                width: 100%;
                max-width: 490px;
            }
        }
        &__btn{
            margin-top: 35px;
            padding: 15px 40px;
            display: flex;
            align-items: center;
            background: #F90042;
            text-decoration: none;
            color: white;
            border-radius: 8px;
            max-width: 180px;
            span {
                margin-left: 8px;
            }
        }

        @media (max-width: 800px) {
            &__content{
                flex-direction: column;

                > div:first-child{
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    h2, p, button{
                        text-align: center;
                    }
                }

                h2 {
                    max-width: 600px;
                    width: 100%;
                }
            }
        }

        @media (max-width: 490px){
            &__wrapper{
                margin-top: 40px;
            }
            &__content{
                > div:first-child{
                    h2 {
                        font-size: 24px;
                        margin-bottom: 15px;
                    }
                    p{
                        font-size: 14px;
                        margin-bottom: 15px;
                    }
                }
            }

            &__btn{
                margin-top: 15px;
            }
        }
    }
</style>