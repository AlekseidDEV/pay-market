<script setup>

import InputField from "@/components/ui/InputField.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

defineProps({
    titleForm: {
        type: String,
        required: true,
        default: ''
    }
})

const modelName = defineModel('name')
const modelTg = defineModel('telegram')
const modelLink = defineModel('link')
const modelComment = defineModel('comment')
const checkboxModel = defineModel('checkbox')

</script>

<template>
  <q-form
    class="advertiser-form__wrapper"
  >
    <div class="block-container">
      <q-card>
        <h2>
          {{ titleForm }}
        </h2>
        <div class="advertiser-form__content">
          <div>
            <InputField
              v-model="modelName"
              label="Ваше имя"
              :lazy-rules="true"
              :rules="[(val) => !!val]"
            />
            <InputField
              v-model="modelTg"
              label="Telegram"
              :lazy-rules="true"
              :rules="[(val) => !!val]"
              mask="S"
              reverse-fill-mask
            />
            <InputField
              v-model="modelLink"
              label="Ссылка на оффер"
              :lazy-rules="true"
              :rules="[(val) => !!val]"
            />
          </div>
          <div>
            <InputField
              v-model="modelComment"
              placeholder="Комментарий"
              filled
              autogrow
            />
            <DefaultBtn
              class="advertiser-form__btn"
            >
              Оставить заявку
            </DefaultBtn>
            <div>
              <q-checkbox
                v-model="checkboxModel"
                class="pm-checkbox"
                checked-icon="check"
                unchecked-icon="check"
              />
              <p>
                Я даю свое <a
                  target="_blank"
                  href="/docs/sogl_obrab.pdf"
                  class="text-red-13"
                >согласие</a>
                на обработку персональных данных, Я даю свое <a
                  target="_blank"
                  href="/docs/sogl_rekl.pdf"
                  class="text-red-13"
                >согласие</a> на
                получение рекламных материалов с помощью SMS и email
              </p>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-form>
</template>

<style lang="scss">
.advertiser-form{
    &__wrapper{
        padding: 0 10px;
        margin-top: 80px;
        margin-bottom: 20px;
        @media (max-width: 490px) {
            margin-top: 40px;
        }

        h2 {
            text-align: center;
        }

        .q-card {
            padding: 50px;
        }

        a {
            text-decoration: none;
        }

        .q-field--error.q-field--with-bottom{
            padding-bottom: 0;
        }
    }
    &__content{
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 45px;

        > div {
            max-width: 400px;
            width: 100%;
            display: flex;
            flex-direction: column;
            &:first-child{
                gap: 15px 0;
            }
            &:last-child{
                .q-field{
                    min-height: 130px;
                }
                > div {
                    margin-top: 15px;
                    display: flex;

                    .q-checkbox{
                        align-items: start;
                        i {
                            font-size: 23px;
                        }
                    }

                    p {
                        margin-top: 5px;
                    }
                }
            }
        }
    }
    &__btn{
        margin-top: 20px;
        padding: 15px 20px;
        width: 100%;
    }

    @media (max-width: 670px) {
        &__wrapper .q-card{
            padding: 20px;
        }
        &__content{
            flex-direction: column;
            align-items: center;
        }
    }
}

.advertiser-form__wrapper .q-card {
    border-radius: 22px;
}
</style>