<script setup>
  import CheckBoxPolicy from "@/components/ui/AuthForm/CheckBoxPolicy.vue";
  import AuthLogin from "@/components/AuthUserPage/AuthLogin.vue";
  import InputNameFull from "@/components/ui/AuthForm/InputNameFull.vue";
  import InputNewPassword from "@/components/ui/AuthForm/InputNewPassword.vue";
  import InputPhone from "@/components/ui/AuthForm/InputPhone.vue";  
  import AuthConfirm from "@/components/AuthUserPage/AuthConfirm.vue";
  import DefaultBtn from "@/components/ui/DefaultBtn.vue";

  import {errorNotify} from "@/utils/errorNotify.js";
  import {useMainStore} from "@/core/stores/index.js";
  import {computed, inject, reactive, ref} from "vue";

  const emits = defineEmits(['changeSlice'])
  const $auth = inject('$auth')

  const store = useMainStore()
  const guest = store.getUser
  const newUserData = reactive({
    username: '',
    login: '',
    password: '',
  })

  let checkPolicy = ref(true)
  let isUserOld = ref(false)

  const disableBtn = computed(() => {
    return Object.values(newUserData).every((field) => field !== '') && checkPolicy.value
  })

  const sendForm = async () => {
      const {key, isNewUser, status, error} = await $auth.requestRegister(newUserData.username)

      if(status === 200 && isNewUser){
          store.setUser({...guest, ...newUserData, key: key})
          emits('changeSlice', AuthConfirm, false)
      }else if(status === 200 && !isNewUser){
          isUserOld.value = true
      }else {
          console.log('Error: ' + error);
          errorNotify()
      }
  }
</script>

<template>
  <div class="block-form">
    <q-form
      class="form"
      @submit.prevent="sendForm"
    >
      <h3 class="form__title">
        Регистрация в кабинете партнера
      </h3>
      <div class="form__input-block">
        <InputNameFull v-model="newUserData.login" />
        <InputPhone
          v-model="newUserData.username"
          :userError="isUserOld"
          errorSmg="Пользователь с таким номером телефона, уже существует"
          @changePhone="isUserOld = false"
        />
        <InputNewPassword
          v-model="newUserData.password"
          autocomplete
        />
      </div>
      <div class="form__wrapper-cont">
        <CheckBoxPolicy
          @changePolicy="checkPolicy = !checkPolicy"
        />
        <DefaultBtn
          v-slot
          class="form__btn-pink"
          :disable="!disableBtn"
          bg-color="pink"
        >
          Зарегистрироваться
        </DefaultBtn>
        <span class="form__come-in">Уже есть личный кабинет?
          <span
            class="form__span-pink"
            @click="emits('changeSlice', AuthLogin)"
          >Войти</span>
        </span>
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
.form{
  &__btn-pink{
    margin: 20px 10px 0 0;
    padding: 16px 10px 16px 10px;
  }
  &__span-pink{
    color: #F90042;
    cursor: pointer;
  }

  &__come-in{
    display: inline-flex;
    gap: 0 5px;
    color: white;
  }

  @media (max-width: 445px) {
    &__come-in{
      margin-top: 29px;
    }
    &__form__wrapper-cont{
      text-align: center;
    }
  }
}
</style>