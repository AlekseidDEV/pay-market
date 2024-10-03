<script setup>

  import {ref} from "vue";
  import DefaultBtn from "@/components/ui/DefaultBtn.vue";

  defineProps({
    rows: {
      required: true,
      type: Array
    },
    columns: {
      required: true,
      type: Array
    }
  })

  const selectRowsQuantity = ref(5)

</script>
<template>
  <q-table
    class="pm-table"
    :rows="rows"
    :columns="columns"
  >
    <template #header="{cols, sort}">
      <slot name="header-top">
        <q-tr>
          <q-td
            v-for="col of cols"
            :key="col.name"
            :class="`text-${col.align}`"
          >
            <div
              class="pm-table__td-header-content"
              :class="`justify-${col.align}`"
            >
              <span>{{ col.label }}</span>
              <q-icon
                v-if="col.sortRow"
                name="arrow_upward"
                size="16px"
                @click="sort(col)"
              />
            </div>
          </q-td>
        </q-tr>
      </slot>
    </template>

    <template #body-cell="{value, col, rowIndex, row}">
      <q-td
        :class="`text-${col.align}`"
        :auto-width="col.autoWith || false"
      >
        {{ value }}
        <slot
          name="body-cell-cust"
          :colName="col.name"
          :rowKey="rowIndex"
          :row="row"
        />
        <slot
          :colName="col.name"
          name="btn-action-first"
        />
        <slot
          :colName="col.name"
          name="btn-action-second"
        />
      </q-td>
    </template>

    <template #bottom-row>
      <slot name="count-bottom" />
    </template>
    <template #no-data="{icon, message}">
      <span v-if="message[0] === 'L'"><q-icon :name="icon" /> Загрузка данных...</span>
      <span v-else><q-icon :name="icon" />
        Нет данных для отображения</span>
    </template>
    <template #bottom="scope">
      <div class="pm-table__wrapper-cust-bottom">
        <div>
          <span>Записей на страннице:</span>
          <q-select
            v-model="selectRowsQuantity"
            borderless
            behavior="menu"
            :options="[5, 10, 15, 20]"
            popup-content-class="q-item__label__dropdown-option"
            @update:model-value="(val) => scope.pagination.rowsPerPage = val"
          />
        </div>
        <div>
          <span>Странница: {{ scope.pagination.page }} из {{ scope.pagesNumber }}</span>
          <div class="pm-table__bottom-pagination">
            <DefaultBtn
              v-if="scope.pagesNumber > 2"
              :disable="scope.isFirstPage"
              bg-color="none"
              @click="scope.firstPage"
            >
              <q-icon
                name="first_page"
              />
            </DefaultBtn>
            <DefaultBtn
              v-if="scope.pagesNumber > 1"
              bg-color="none"
              @click="scope.prevPage"
            >
              <q-icon
                name="chevron_left"
              />
            </DefaultBtn>
            <DefaultBtn
              v-if="scope.pagesNumber > 1"
              bg-color="none"
              @click="scope.nextPage"
            >
              <q-icon
                name="chevron_right"
              />
            </DefaultBtn>
            <DefaultBtn
              v-if="scope.pagesNumber > 2"
              :disable="scope.isLastPage"
              bg-color="none"
              @click="scope.lastPage"
            >
              <q-icon
                name="last_page"
              />
            </DefaultBtn>
          </div>
        </div>
      </div>
    </template>
  </q-table>
</template>

<style lang="scss">

</style>