<script setup>
import { ref } from 'vue';

const props = defineProps({  
  title: {
    type: String,
    default: ''
  },  
})

const showModel = defineModel()

const emit = defineEmits(['update:model-value', 'hide-dialog'])

const refDialog = ref(null)

const hideDialog = () => {
  refDialog.value.hide()
}

</script>

<template>
  <q-dialog
    ref="refDialog"
    v-model="showModel"    
    class="settings-add-list-item__wrapper"    
    @hide="emit('hide-dialog')"
  >
    <q-card class="settings-add-list-item__container bg-purple-10">
      <q-card-section class="settings-add-list-item__header">
        <q-card
          bordered
          class="text-white bg-purple-12"
        >
          <q-card-section>
            {{ props.title }}
          </q-card-section>
        </q-card>
        <q-btn
          class="q-py-xs bg-purple-12"
          round
          size="10px"     
          @click="hideDialog"     
        >
          <q-icon
            name="icon-pm-cross"
            size="14px"
          />
        </q-btn>
      </q-card-section>
      <q-card-section class="settings-add-list-item__content">
        <q-card
          bordered
          class="bg-purple-12"
        >
          <q-card-section>
            <slot name="content" />
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section class="settings-add-list-item__footer">
        <slot name="footer" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.settings-add-list-item__wrapper {

  .settings-add-list-item__container {
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    .settings-add-list-item__header {
      padding: 0;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-between;
      
      .q-card {
        padding: 0;

        .q-card__section {
          padding: 4px 10px;
          display: flex;
          align-items: center;
        }
      }
    }

    .settings-add-list-item__content {
      padding: 0;

      .q-card {
        padding: 0;

        .q-card__section {
          padding: 10px;
        }
      }
    }

    .settings-add-list-item__footer {
      padding: 0;
    }
  }
}
</style>
