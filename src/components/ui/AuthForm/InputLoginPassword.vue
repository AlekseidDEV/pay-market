<script setup>
  import {ref} from "vue";
  defineProps({
    userError: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['changePassword'])

  const isPwd = ref('')
  const validate = (val) => {

    if(val === ''){
      return 'Обязтельное поле'
    }else if(val.length < 8){
      return 'Минимум символов: "8"'
    }

    return true
  }
</script>

<template>
  <q-input
    autocomplete
    standout
    :type="isPwd ? 'text' : 'password'"
    label="Пароль"
    :no-error-icon="false"
    :error="userError"
    :rules="[validate]"
    @update:model-value="emits('changePassword')"
  >
    <template
      #append
    >
      <span
        class="eye-password"
        :class="isPwd ? 'icon-eye-close' : 'icon-eye'"
        @click.stop="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<style scoped lang="scss">
</style>