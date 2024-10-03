<script setup>
  import {ref} from "vue";

  const isPwd = ref('')
  const regExp = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/
  const validPassword = (val) => {
    if(val === ''){
      return 'обязательное поле'
    }else if(!regExp.test(val)){
      return 'Пароль должен быть не менее 8 символов, и содержать хотя бы одну заглавную букву, цифру, спецсимвол'
    }

    return true
  }
</script>

<template>
  <q-input
    autocomplete
    standout
    class="field__new-password"
    :type="isPwd ? 'text' : 'password'"
    label="Пароль"
    :no-error-icon="true"
    :rules="[validPassword]"
    :lazy-rules="true"
  >
    <template
      #append
    >
      <span
        class="eye-password"
        :class="isPwd ? 'icon-eye-close' : 'icon-eye'"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<style scoped lang="scss">
</style>