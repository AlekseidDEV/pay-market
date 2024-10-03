<script setup>

import InputField from "@/components/ui/InputField.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { inject, ref } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";

const $http = inject("$http");

const formRef = ref(null);

const userName = ref("");
const userPhone = ref("");
const userTg = ref("");
const userComment = ref("");

const sendForm = async () => {
    const formatedPhone = userPhone.value.replace(/\W/gi, "");
    const formatedTg = userTg.value.replace(/[\s@]/gi, "");

    const { error } = await $http.sendMainPageForm({
        name: userName.value,
        tel: formatedPhone,
        tg: formatedTg,
        comment: userComment.value || "-",
    });

    if (error) {
        errorNotify("Ошибка отправки формы");
        return;
    }

    userName.value = "";
    userPhone.value = "";
    userTg.value = "";
    userComment.value = "";

    formRef.value.reset();

    successNotify("Форма отправлена");
};

</script>

<template>
  <div class="main-questions-form__wrapper">
    <q-card class="main-questions-form__content block-container">
      <h2>Опишите ваш вопрос или предложение</h2>
      <q-form
        ref="formRef"
        @submit.prevent="sendForm"
      >
        <div>
          <InputField
            v-model="userName"
            label="Ваше имя"
            :lazy-rules="true"
            :rules="[(val) => !!val]"
          />
          <InputField
            v-model="userPhone"
            label="Контактный телефон"
            mask="+7 (###) ###-##-##"
            :lazy-rules="true"
            :rules="[(val) => !!val]"
          />
          <InputField
            v-model="userTg"
            label="Telegram"
            :lazy-rules="true"
            :rules="[(val) => !!val]"
            mask="S"
            reverse-fill-mask
          />
        </div>
        <div>
          <InputField
            v-model="userComment"
            filled
            autogrow
            label="Описание вопроса"
          />

          <DefaultBtn :border="false">
            Отправить
          </DefaultBtn>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<style lang="scss">

.main-questions-form {
    &__wrapper {
        margin-top: 80px;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    &__content {
        padding: 30px 0;

        h2 {
            text-align: center;
        }

        form {
            padding: 35px;
            display: flex;
            gap: 15px 20px;

            .q-field--error.q-field--with-bottom{
                padding-bottom: 0;
            }

            > div {
                display: flex;
                flex-direction: column;
                width: 100%;

                &:first-child {
                    gap: 15px;
                }

                &:last-child {
                    gap: 15px;

                    button {
                        max-width: 140px;
                        width: 100%;
                        height: 60px;
                    }
                }
            }
        }
    }

    @media (max-width: 670px) {
        &__content {
            form {
                flex-direction: column;
            }
        }
    }
    @media (max-width: 490px) {
        &__content {
            h2 {
                font-size: 20px;
                padding: 0 15px;
            }

            form {
                padding: 25px;

                > div:last-child {
                    button {
                        max-width: 100%;
                        width: 100%;
                        height: 50px;
                    }
                }
            }
        }
    }
}

.q-card.main-questions-form__content {
    border-radius: 22px;
}
</style>