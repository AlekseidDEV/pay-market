<script setup>
  const regExp = /^[А-Я][а-яА-Я\-]{0,}\s[А-Я][а-яА-Я\-]{1,}\s[А-Я][а-яА-Я\-]{1,}?$/

</script>
<template>
  <q-input
    standout
    label="Фамилия Имя Отчество"
    name="nameFull"
    maxlength="60"
    :no-error-icon="true"
    :rules="[val => val !== '' && regExp.test(val)]"
    :lazy-rules="true"
    error-message="Укажите фамилию, имя и отчество через пробел"
  />
</template>

<style scoped lang="scss">

</style>