<script setup>
    import DefaultBtn from "@/components/ui/DefaultBtn.vue";

    import { inject, ref } from "vue";
    import { errorNotify } from "@/utils/errorNotify.js";
    import { successNotify } from "@/utils/successNotify.js";

    const props = defineProps({
        offerDel: {
            type: [Object, null],
            required: true,
            default: () => {}
        }
    })

    const emits = defineEmits(['delete-offer'])

    const model = defineModel()
    const dialogRef = ref(null)
    const $http = inject('$http')

    const disconnectOffer = async () => {
        const {error} = await $http.delOfferToUser({
            user_id: props.offerDel.userId,
            offer_id: props.offerDel.offerId
        })

        if(error){
            console.error('Error: ' + error);
            errorNotify()
            return
        }

        dialogRef.value.hide()
        emits('delete-offer')
        successNotify('Оффер отключен')
    }
</script>

<template>
  <q-dialog
    ref="dialogRef"
    v-model="model"
    class="offer-toggle-dialog__wrapper"
  >
    <q-card class="offer-toggle-dialog__card">
      <span
        class="offer-toggle-dialog__close"
        @click="dialogRef.hide()"
      >
        <q-icon
          name="close"
          size="20px"
        />
      </span>
      <div class="offer-toggle-dialog__card-content">
        <h3>Подтвердите действие</h3>
        <p>Вы действительно хотите отключить оффер {{ offerDel.offerName }} для пользователя {{ offerDel.login }}, id: {{ offerDel.userId }} ?</p>
        <div class="offer-toggle-dialog__card-actions">
          <DefaultBtn
            :border="false"
            @click="disconnectOffer"
          >
            Подтвердить
          </DefaultBtn>
          <DefaultBtn
            :border="false"
            bg-color="grey"
            @click="dialogRef.hide()"
          >
            Отменить
          </DefaultBtn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
    .offer-toggle-dialog{
        &__card{
            padding: 40px 28px;
            text-align: center;
            position: relative;
        }
        &__card-content{
            h3 {
                margin-bottom: 15px;
            }
            p{
                max-width: 280px;
                width: 100%;
            }
        }
        &__close{
            position: absolute;
            top: 12px;
            right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 25px;
            background: #323232;
            border-radius: 50px;
            padding: 10px;
            cursor: pointer;
        }
        &__card-actions{
            display: flex;
            justify-content: center;
            gap: 10px;
            button {
                padding: 12px 14px;
            }
        }
    }
</style>