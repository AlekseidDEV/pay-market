<script setup>

import AddFavorite from "@/components/ui/Table/AddFavorite.vue";

import { useMainStore } from "@/core/stores/index.js";
import {ref} from "vue";

defineProps({
    rows: {
        type: Array,
        required: true,
    },
    column: {
        type: Array,
        required: true,
    },
});

const uploadsBaseUrl = import.meta.env.VITE_UPLOADS_BASE_URL;
const user = useMainStore().getUser

const modelSelect = defineModel();
const actionsComponentRef = ref(null)

const updateSelectionList = (details) => {
    if(details.added){
        actionsComponentRef.value.addFavoriteOffer(user.id, details.rows[0].id)
    }else {
        actionsComponentRef.value.deleteFavoriteOffer(user.id, details.rows[0].id)
    }
}

</script>

<template>
  <q-table
    v-model:selected="modelSelect"
    class="pm-table__offers"
    :rows="rows"
    :columns="column"
    selection="multiple"
    @selection="updateSelectionList"
  >
    <template #body-selection="scope">
      <AddFavorite
        ref="actionsComponentRef"
        v-model="scope.selected"
      />
    </template>
    <template #header-cell="{col}">
      <q-th>
        {{ col.label }}
        <slot
          :colName="col.name"
          name="tooltip-slot"
        />
      </q-th>
    </template>
    <template #body-cell-offer="{value, col, row}">
      <q-td :class="`text-${col.align}`">
        <div class="cell__content-offer">
          <div>
            <img
              class="cell__logo"
              :src="uploadsBaseUrl + row.logo"
              alt="img"
            >
            <p>{{ row.domine }}</p>
          </div>
          <p>{{ row.category.name }}</p>
        </div>
      </q-td>
    </template>
    <template #body-cell="{value, col}">
      <q-td
        :class="`text-${col.align}`"
        :auto-width="col.autoWith || false"
      >
        {{ col.name === "reward" ? value + "/руб. Подписка" : value }}
        <slot
          :colName="col.name"
          name="body-td-slot"
        />
      </q-td>
    </template>
    <template #bottom-row>
      <tr v-if="rows.length === 0">
        <td colspan="8">
          <q-icon
            class="pm-table__offers__warn-icon"
            name="warning"
            size="22px"
          />
          <span>Нет данных для отображения</span>
        </td>
      </tr>
    </template>
  </q-table>
</template>

<style lang="scss">
.pm-table__offers{
    &__warn-icon{
        margin-right: 10px;
    }
}
</style>