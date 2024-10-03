<script setup>
const props = defineProps({
    cells: {
        required: true,
        type: Array,
    },
    data: {
        type: Array,
        required: true,
    }
})

const totalSum = (name, type) => {
    if(type === 'sum'){
        return  props.data.reduce((sum, item) => {
            return sum += +item[name]
        }, 0)
    }else {
        return '%'
    }
}
</script>

<template>
  <div />
  <q-tr class="pm-table__bottom-row">
    <q-td
      v-for="cell of cells"
      :key="cell.name"
      :colspan="cell.size"
      :class="`text-${cell.align}`"
    >
      {{ cell.type ? totalSum(cell.name, cell.type) : cell.name }}
    </q-td>
  </q-tr>
</template>

<style scoped lang="scss">
    div{
        height: 20px;
    }
</style>