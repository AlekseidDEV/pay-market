<script setup>
import TableOffers from "@/components/ui/Table/TableOffers.vue";
import TableToolTip from "@/components/ui/Table/TableToolTip.vue";

import { useRouter } from "vue-router";
import { ref, watch } from "vue";


const props = defineProps({
    rowsData: {
        type: [Array, undefined],
        required: true,
        default: () => [],
    },
    isAllSelectedRows: {
        type: Boolean,
        required: false,
        default: false
    }
});

const router = useRouter();
const selectedOffers = ref([])

const columns = [
    { name: "id", label: "ID", field: "id", align: "center", autoWith: true },
    { name: "offer", label: "Оффер", field: "offer", align: "center", autoWith: false },
    { name: "reward", label: "Вознаграждение и целевое действие", field: "target_action_price", align: "center", autoWith: false },
    { name: "cr", label: "CR", field: "cr", align: "center", autoWith: true },
    { name: "epc", label: "EPC", field: "epc", align: "center", autoWith: true },
    { name: "epl", label: "EPL", field: "epl", align: "center", autoWith: true },
    { name: "cpa", label: "CPA", field: "cpa", align: "center", autoWith: true },
];

const toolTipTexts = {
    cr: "% целевых действий из кликов",
    epc: "заработок с одного клика",
    epl: "заработок с одной заявки",
    cpa: "заработок с одной привязка карты",
};

watch(() => props.isAllSelectedRows, (newValue) => {
    if(newValue){
        Object.assign(selectedOffers.value, props.rowsData)
    }else {
        selectedOffers.value.splice(0)
    }
})
</script>
<template>
  <div class="offers-table">
    <TableOffers
      v-model="selectedOffers"
      :column="columns"
      :rows="isAllSelectedRows ? selectedOffers : rowsData"
      :hide-bottom="true"
      :pagination="{ rowsPerPage: 0 }"
      @row-click="(ept, row, index) => router.push({name: 'user-offer-detail' , params: {id: row.id}})"
    >
      <template #tooltip-slot="{colName}">
        <TableToolTip
          v-if="['cr', 'epc', 'epl', 'cpa'].includes(colName)"
          :name-tip="colName"
          :texts="toolTipTexts"
        />
      </template>
      <template #body-td-slot="{colName}">
        <TableToolTip
          v-if="['cr', 'epc', 'epl', 'cpa'].includes(colName)"
          :name-tip="colName"
          :texts="toolTipTexts"
        />
      </template>
    </TableOffers>
  </div>
</template>

<style scoped lang="scss">
</style>