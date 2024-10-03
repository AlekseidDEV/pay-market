<script setup>
  import PmTable from "@/components/ui/Table/PmTable.vue";
  import DefaultBtn from "@/components/ui/DefaultBtn.vue";

  import {inject} from "vue";
  import {errorNotify} from "@/utils/errorNotify.js";
  import {successNotify} from "@/utils/successNotify.js";
  import TrafficSourceCopyField from "@/components/OfferDetailPage/TrafficSourceCopyField.vue";

  const emits = defineEmits(['update-table'])

  defineProps({
    dataRows: {
      type: Array,
      required: true,
      default: () => []
    },
  })

  const $http = inject('$http')

  const formatedLinks = (val) => {
    return `https://pmv4.ru/web/index.php?r=api/redirect/new&uid=${val}`
  }

  const columns = [
    {name: "id", label: "N", field: "number", align: "center", autoWith: true},
    {name: "name", label: "Название ", field: "name", align: "center", autoWith: false},
    {
      name: "link",
      label: "Ссылка ",
      field: "uid",
      align: "center",
      autoWith: false,
      format: (val) => formatedLinks(val)
    },
    {name: "cpl", label: "Цена за лид (CPL)", field: "price_cpl", align: "center", autoWith: false},
    {name: "cpa", label: "Цена за подписку (CPA)", field: "price_cpa", align: "center", autoWith: false},
    {name: "btn", label: "", field: "", align: "center", autoWith: true},
  ];

  const deleteTrafficSource = async (id) => {
    const {error} = await $http.deleteTrafficSource(id)

    if (error) {
      console.error();
      errorNotify()
      return
    }

    successNotify('Источник трафика удален')
    emits('update-table')
  }
</script>

<template>
  <div class="traffic-source__table-wrapper">
    <h2 class="traffic-source__title-table">
      Источники трафика
    </h2>
    <PmTable
      :columns="columns"
      :rows="dataRows"
    >
      <template #body-cell-cust="{colName, rowKey, row}">
        <span v-if="colName === 'id'">{{ rowKey + 1 }}</span>
        <DefaultBtn
          v-if="colName === 'btn'"
          class="traffic-source__trash-btn"
          bg-color="dark-grey"
          @click="deleteTrafficSource(row.id)"
        >
          <q-icon name="icon-pm-trash" />
        </DefaultBtn>
        <TrafficSourceCopyField
          v-if="colName === 'link'"
          :link-source="formatedLinks(row.uid)"
        />
      </template>
    </PmTable>
  </div>
</template>

<style lang="scss">
.traffic-source {
  &__table-wrapper {
    margin-top: 60px;
    padding-bottom: 30px;
  }

  &__title-table {
    margin-bottom: 30px;
  }

  &__trash-btn {
    padding: 8px;
  }
}
</style>