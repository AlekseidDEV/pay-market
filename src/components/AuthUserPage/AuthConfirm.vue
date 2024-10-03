<script setup>
  import AuthSupportPopup from "@/components/ui/AuthForm/AuthSupportPopup.vue";
  import InputAuthCode from "@/components/ui/AuthForm/InputAuthCode.vue";
  import AuthNewPassword from "@/components/AuthUserPage/AuthNewPassword.vue";

  import { getConfirmCode } from "@/core/api/api.getConfirmCode.js";
  import { useMainStore } from "@/core/stores/index.js";  
  import { errorNotify } from "@/utils/errorNotify.js";
  
  import {inject, onBeforeMount, onMounted, ref } from "vue";
  import router from "@/core/router/index.js";

defineProps({
    param: {
      type: Boolean,
      default: false,
      required: false,
    },
  });
  const emits = defineEmits(["changeSlice"]);

  const $auth = inject('$auth')

  const store = useMainStore();
  const user = store.getUser;

  const inputValue = ref("");
  const countTimer = ref(0);
  const code = ref("");

  const maskedPhone = user.username.replace(/(\+7\s?)(\(\d{3}\))(\s?\d{3})(\W?\d{2})(\W?\d{2})/gi, "$1$2 ***-**$5");

  let interval;

  const timerToRepetMsg = () => {
    countTimer.value = 80;
    inputValue.value = "";

    interval = setInterval(() => {
      if (countTimer.value !== 0) {
        countTimer.value--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getCodeMessege = async () => {
    timerToRepetMsg();

    const {success, error} = await getConfirmCode(user.username, user.key)

      if(success){
          code.value = '123450' // WARN - не забыть сделать запись нормального кода!
      }else {
          console.log(error);
          errorNotify();
      }
  };

  const registrUser = async () => {
      try {
          const responseReg = await $auth.regNewUser(user, user.key);

          if(responseReg.data.status){
             store.setUser(responseReg.data.user)
             router.push({name: 'user-main'})
          }
      }catch (error){
          errorNotify()
          console.log(error);
      }
  };

  onMounted(() => {
    getCodeMessege();
  });

  onBeforeMount(() => {
    clearInterval(interval);
  });
</script>

<template>
  <div class="block-form">
    <form class="form">
      <div class="form__titles">
        <h3 class="form__title">
          Код из СМС
        </h3>
        <p class="form__text form__text-code">
          Мы отправили одноразовый код на <span>{{ maskedPhone }}</span>. Введите его в поле ниже
        </p>
      </div>
      <div class="form__code-field">
        <InputAuthCode
          v-model="inputValue"
          autocomplete
          :code-str="code"
          @succesCode="param ? emits('changeSlice', AuthNewPassword): registrUser()"
        />
      </div>
      <p
        v-if="countTimer > 0"
        class="form__smg-timer"
      >
        Запросить код повторно можно будет через {{ countTimer }}
        секунд
      </p>
      <p
        v-else
        class="form__repet-smg"
        @click="getCodeMessege"
      >
        Запросить код повторно
      </p>
      <AuthSupportPopup />
    </form>
  </div>
</template>

<style scoped lang="scss">
.form {
    &__text-code {
        max-width: 387px;
        text-align: center;
    }

    &__smg-timer {
        margin-top: 30px;
        text-align: center;
    }

    &__repet-smg {
        color: rgb(249, 0, 66);
        font-size: 15px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        margin-top: 30px;
        cursor: pointer;
    }

    &__text-code span {
        white-space: nowrap;
    }

    &__code-field {
        max-width: 342px;
        width: 100%;
    }
}
</style>