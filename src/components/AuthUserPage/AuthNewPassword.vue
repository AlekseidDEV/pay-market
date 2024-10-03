<script setup>

import InputField from "@/components/ui/InputField.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import InputNewPassword from "@/components/ui/AuthForm/InputNewPassword.vue";
import AuthLogin from "@/components/AuthUserPage/AuthLogin.vue";

import { computed, inject, ref } from "vue";
import { useMainStore } from "@/core/stores/index.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";

const $auth = inject('$auth')
const emits = defineEmits(['changeSlice'])

const store = useMainStore()
const user = store.getUser

const password = ref('')
const repetPassword = ref('')
const isPwdRepet = ref(false)

const disabled = computed(() => {
    return password.value !== '' && repetPassword.value !== ''
})

const resetPassword = async () => {
    const {isReset, error} = await $auth.resetPassword(user.username, user.key, password.value)

    if(isReset){
        successNotify('Пароль успешно изменён')
        emits('changeSlice', AuthLogin , false)
    }else {
        errorNotify()
        console.log('Error: ' + error);
    }
}
</script>

<template>
  <div class="block-form">
    <q-form
      class="form"
      @submit="() => resetPassword"
    >
      <h3>
        Придумайте новый пароль
      </h3>
      <div class="form__field-block">
        <InputNewPassword v-model="password" />
        <InputField
          v-model="repetPassword"
          autocomplete
          label="повторите пароль"
          :type="isPwdRepet ? 'text' : 'password'"
          error-message="пароли не совпадают"
          :rules="[() => repetPassword === password]"
        >
          <template #append-slot>
            <span
              class="eye-password"
              :class="isPwdRepet ? 'icon-eye-close' : 'icon-eye'"
              @click="isPwdRepet = !isPwdRepet"
            />
          </template>
        </InputField>
      </div>

      <default-btn
        class="form__btn-reset"
        :disable="!disabled"
        @click="resetPassword"
      >
        Сменить пароль
      </default-btn>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
.form {
    &__field-block {
        display: flex;
        max-width: 479px;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        gap: 18px 7px;
        margin-top: 35px;
    }
    &__btn-reset{
        margin-top: 35px;
        padding: 15px 40px;
    }
    @media (max-width: 445px) {
        &__field-block{
            flex-direction: column;
        }
    }
}
</style>