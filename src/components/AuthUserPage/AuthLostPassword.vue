<script setup>
  import InputPhone from "@/components/ui/AuthForm/InputPhone.vue";
  import DefaultBtn from "@/components/ui/DefaultBtn.vue";
  import AuthConfirm from "@/components/AuthUserPage/AuthConfirm.vue";

  import { computed, inject, ref } from "vue";
  import { errorNotify } from "@/utils/errorNotify.js";
  import { useMainStore } from "@/core/stores/index.js";


  const emits = defineEmits(["changeSlice"]);

  const $auth = inject('$auth')
  const store = useMainStore()

  const phone = ref("");
  const phoneError = ref(false)

  const disableBtn = computed(() => {
    return phone.value.length === 18;
  });

  const confirmSlice = async () => {
      const {key, status, isUser, error} = await $auth.requestResetpassword(phone.value)

      if(status === 200 && isUser){
          store.setUser({username: phone, key: key})
          emits("changeSlice", AuthConfirm, true);
      }else if(status === 200 && !isUser){
          phoneError.value = true
      }else {
          errorNotify()
          console.log('Error: ' + error);
      }
  };
</script>

<template>
  <div class="block-form">
    <q-form
      class="form"
      @submit="confirmSlice"
    >
      <h3 class="form__title">
        Восстановление пароля
      </h3>
      <div class="form__field-block">
        <InputPhone
          v-model="phone"
          :userError="phoneError"
          errorSmg="Пользователя с таким номером телефона не существует"
          @changePhone="phoneError = false"
        />
        <DefaultBtn
          v-slot
          :disable="!disableBtn"
          bg-color="pink"
        >
          Продолжить
        </DefaultBtn>
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
.form {
    &__field-block {
        display: flex;
        max-width: 479px;
        width: 100%;
        justify-content: space-between;
        gap: 18px 7px;
    }
    @media (max-width: 445px) {
        &__field-block{
            flex-direction: column;
        }
    }
}

label {
    width: 100%;
}

button {
    padding: 16px 10px 16px 10px;
    max-height: 56px;
}
</style>


