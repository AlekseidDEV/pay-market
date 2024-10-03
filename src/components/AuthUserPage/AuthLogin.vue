<script setup>
import AuthRegister from "@/components/AuthUserPage/AuthRegister.vue";
import InputPhone from "@/components/ui/AuthForm/InputPhone.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import AuthLostPassword from "@/components/AuthUserPage/AuthLostPassword.vue";
import InputLoginPassword from "@/components/ui/AuthForm/InputLoginPassword.vue";

import { computed, inject, onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { errorNotify } from "@/utils/errorNotify.js";
import { useMainStore } from '@/core/stores/index.js';
import { fullscreenSpinner } from "@/utils/fullscreenSpinner";

const store = useMainStore()
const router = useRouter()
const $auth = inject('$auth')
const spinner = fullscreenSpinner()

const emits = defineEmits(['changeSlice'])
const dataUser = reactive({
  phone: "",
  password: ""
})
let isErrorUser = ref(false)
let errorMess = ref('')

const disableBtn = computed(() => {
  return Object.values(dataUser).every((field) => field.trim() !== '')
})

const loginnedUser = async () => {
  spinner.show()
  const { error, data, success } = await $auth.loginUser(dataUser)
  if (success) {
    store.setUser(data)
    if (data?.role?.item_name === 'admin') {
      router.push({ name: 'admin-main' })
    }
    else if (data?.role?.item_name === 'user') {
      router.push({ name: 'user-main' })
    } else {
      router.push({ name: 'main-page' })
    }
  } else {
    isErrorUser.value = true
    errorMess.value = error
    errorNotify(error)
  }
  spinner.hide()
}

onMounted(() => {
    if(store.userRole === 'user'){
        router.push({ name: 'user-main' })
    }else if(store.userRole === 'admin'){
        router.push({ name: 'admin-main' })
    }
})
</script>

<template>
  <div class="block-form">
    <q-form
      class="form"
      @submit="loginnedUser"
    >
      <div class="form__titles">
        <h3 class="form__title">
          Вход в кабинет партнера
        </h3>
        <p class="form__text">
          Введите номер телефона чтобы войти
        </p>
      </div>
      <div class="form__input-block">
        <InputPhone
          v-model="dataUser.phone"
          :errorSmg="errorMess"
          :userError="isErrorUser"
          @changePhone="isErrorUser = false"
        />
        <InputLoginPassword
          v-model="dataUser.password"
          autocomplete
          :userError="isErrorUser"
          @changePassword="isErrorUser = false"
        />
      </div>
      <div class="form__wrapper-cont">
        <DefaultBtn
          v-slot
          class="pink-btn"
          bg-color="pink"
          :disable="!disableBtn"
        >
          Продолжить
        </DefaultBtn>
        <div class="form__btns">
          <div class="form__span-btns">
            <span
              class="span-btn"
              @click="emits('changeSlice', AuthLostPassword)"
            >Не помню пароль </span>
            <span
              class="span-btn"
              @click="emits('changeSlice', AuthRegister)"
            >Зарегистрироваться</span>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
.form {
  &__span-btns {
    display: flex;
    gap: 18px 49px;

    @media (max-width: 445px) {
      flex-direction: column;
      align-items: center;
    }
  }
}

.span-btn {
  color: rgb(249, 0, 66);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
}

.pink-btn {
  margin: 20px 0px;
  padding: 16px 10px 16px 10px;
}
</style>