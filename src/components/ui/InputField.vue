<script setup>
    import { ref } from "vue";

    const defaultInput = ref(null)

    defineExpose({
        defaultInput
    })
</script>

<template>
  <q-input
    ref="defaultInput"
    standout
    class="default-field"
  >
    <template #append>
      <slot name="append-slot" />
    </template>
  </q-input>
</template>

<style scoped lang="scss">

</style>