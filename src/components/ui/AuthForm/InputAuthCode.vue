<script setup>
  const props = defineProps({
    codeStr: {
      type: String,
      default: ''
    }
  })

  const emits = defineEmits(['succesCode'])

  const examCode = (value) => {

    if(value.length === 6 && value !== props.codeStr){
      return "неверный код"
    }else if(value === props.codeStr) {
      emits('succesCode')
    }

    return true
  }
</script>

<template>
  <q-input
    autocomplete
    standout
    maxlength="6"
    :no-error-icon="true"
    class="input__confirm-code"
    label="Код из СМС"
    type="password"
    :rules="[examCode]"
  />
</template>

<style scoped lang="scss">

</style>