<script setup>
  defineProps({
    userError: {
      type: Boolean,
      required: false,
      default: false
    },
    errorSmg: {
      type: String,
      required: false,
      default: ''
    }
  })

  const emits = defineEmits(['changePhone'])
</script>

<template>
  <q-input
    standout
    label="Номер телефона"
    type="tel"
    :rules="[val => val !== '' && val.length === 18]"
    :lazy-rules="true"
    :no-error-icon="true"
    :error="userError"
    mask="+7 (###) ###-##-##"
    :error-message="!userError ? 'Укажите номер телефона' : errorSmg"
    @update:model-value="emits('changePhone')"
  />
</template>
<style scoped lang="scss">

</style>