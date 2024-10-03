<script setup>
defineProps({
    cells: {
        type: Array,
        required: true
    }
})
</script>

<template>
  <q-tr class="pm-table__thead-row">
    <q-th
      v-for="cell of cells"
      :key="cell.name"
      :colspan="cell.size"
    >
      {{ cell.name }}
    </q-th>
  </q-tr>
</template>

<style scoped lang="scss">

</style>