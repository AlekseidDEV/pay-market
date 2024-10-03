<script setup>
import { ref, watch } from "vue";

    const emits = defineEmits(['change-filter'])

    const filterId = ref('0')
    const btnFilters = [
        {label: 'Все выплаты', value: '0'},
        {label: 'Отклоненные', value: '2'},
        {label: 'Проведенные', value: '3'},
        {label: 'Новые', value: '1'},
    ]

    watch(filterId, (newValue) => {
        if(newValue) emits('change-filter', newValue)
    })
</script>

<template>
  <div class="admin-payout-table-filter__wrapper">
    <q-chip
      v-for="btn of btnFilters"
      :key="btn.label"
      clickable
      outline
      :label="btn.label"
      size="lg"
      :color="filterId === btn.value ? 'red-13' : 'grey-13'"
      @click="filterId = btn.value"
    />
  </div>
</template>

<style lang="scss">
.admin-payout-table-filter{
    &__wrapper{
        margin-top: 30px;
    }
}
</style>