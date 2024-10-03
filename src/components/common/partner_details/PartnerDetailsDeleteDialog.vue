<script setup>
import DefaultBtn from '@/components/ui/DefaultBtn.vue'

import { ref, inject } from 'vue';
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { errorNotify } from "@/utils/errorNotify.js";

const props = defineProps({    
    detailsId: {
        type: [Number, null],
        required: true,
        default: null
    }
})

const emit = defineEmits(['update:model-value', 'hide-dialog', 'details-deleted'])

const deleteDialogRef = ref(null)
const isShowDeleteDialog = defineModel()

const spinner = fullscreenSpinner()
const $http = inject('$http')

const hideDeleteDialog = () => {
    deleteDialogRef.value.hide()
}

const deletePartnerDetails = async () => {
    spinner.show()
    const { error, success } = await $http.deletePartnerDetails(props.detailsId)
    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка при удалении реквизитов")
        spinner.hide()
    }
    if (success) {
        spinner.hide()
        emit('details-deleted')
        emit('hide-dialog')
    }
}

</script>

<template>
  <q-dialog
    ref="deleteDialogRef"
    v-model="isShowDeleteDialog"
    transition-show="rotate"
    transition-hide="rotate"
    class="partner-details-delete-dialog"
    @hide="emit('hide-dialog')"
  >
    <q-card class="bg-purple-10 column no-wrap">
      <q-card-section class="partner-details-delete-dialog__header">
        <span>Удаление реквизитов</span>
        <q-btn
          class="q-py-xs bg-purple-12"
          round
          size="10px"
          @click="hideDeleteDialog"
        >
          <q-icon
            name="icon-pm-cross"
            size="14px"
          />
        </q-btn>
      </q-card-section>
      <q-card-section>
        <p class="partner-details-delete-dialog__message">
          Вы действительно хотите<br>        
          удалить реквизиты?<br>        
        </p>
      </q-card-section>
      <q-card-section class="partner-details-delete-dialog__actions">
        <DefaultBtn
          class="btn-2 full-width"
          bg-color="pink"          
          @click="deletePartnerDetails"
        >
          Удалить реквизиты
        </DefaultBtn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<style lang="scss">
.partner-details-delete-dialog {

    .q-card {
        padding: 16px        
    }

    &__header {        
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        span {
            font-size: 18px;
        }        

        &.q-card__section {
            padding: 0;
        }
    }    

    &__message {
        padding-top: 16px;
        text-align: center;
    }

    &__actions {

        >button {
            padding: 20px 45px;
        }
    }
}
</style>
