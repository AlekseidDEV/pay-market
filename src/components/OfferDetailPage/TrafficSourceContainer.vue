<script setup>


import TrafficSourceSelection from "@/components/OfferDetailPage/TrafficSourceSelection.vue";
// import TrafficSourceCopyField from "@/components/OfferDetailPage/TrafficSourceCopyField.vue";
import TrafficSourceAddedForm from "@/components/OfferDetailPage/TrafficSourceAddedForm.vue";
import TrafficSourceAddedTable from "@/components/OfferDetailPage/TrafficSourceAddedTable.vue";

import { useRoute } from "vue-router";
import { errorNotify } from "@/utils/errorNotify.js";

import { useMainStore } from "@/core/stores/index.js";
import { inject, onMounted, ref } from "vue";

const $http = inject('$http')

const routeId = useRoute().params.id
const user = useMainStore().getUser

const currentNameSource = ref('default');
const trafficSourceList = ref([])

// const linksList = new Map([
//     ["default", "https://www.figma.com/design/D9Wfid2dDAQUBEuRvpat5E"],
//     ["Яндекс.Директ", "https://direct.yandex.ru"],
//     ["Google Adwords", "https://ads.google.com/intl/ru_ALL/home/"],
//     ["Вконтакте", "https://vk.com/"],
//     ["Telegram", "https://web.telegram.org/"],
//     ["Target My.com", "https://target.vk.ru/"]
// ])

const getTrafficSourceList = async () => {
    const {error, data} = await $http.getTrafficSourceList({
        user_id: user.id,
        offer_id: routeId
    })

    if(error){
        console.error('Error: ' + error);
        errorNotify()
        return
    }

    trafficSourceList.value.splice(0)
    Object.assign(trafficSourceList.value, data.sources)
}


onMounted(() => {
    getTrafficSourceList()
})
</script>

<template>
  <q-card class="traffic-source__wrapper">
    <h2 class="traffic-source__title">
      Добавьте источники трафика
    </h2>
    <!--<TrafficSourceCopyField :link-source="linksList.get(currentNameSource)"/> WARN - убрать, если все таки решат что это поле не нужно. Посмотри содержимое компонента перед тем как разкоментить -->
    <TrafficSourceSelection v-model="currentNameSource" />
    <TrafficSourceAddedForm
      :name-traffic="currentNameSource"
      :offer-id="routeId"
      :user-id="user.id"
      @updateTable="getTrafficSourceList"
    />
    <TrafficSourceAddedTable
      :data-rows="trafficSourceList"
      @updateTable="getTrafficSourceList"
    />
  </q-card>
</template>

<style lang="scss">
.traffic-source {
    &__wrapper {
        margin-bottom: 100px;
        padding: 24px 24px 0px 24px;
    }

    &__title {
        margin-bottom: 30px;
    }

    &__copy-btn {
        padding: 12px 40px;
        margin-top: 8px;
        margin-bottom: 8px;

        &--mobile {
            width: 26px;
            height: 26px;

            i {
                font-size: 12px;
                display: flex;
                justify-content: center;
            }
        }
    }

    &__field-copy {
        margin-top: 10px;
    }

    &__wrapper-field {
        display: flex;
        gap: 0px 24px;
        margin-bottom: 25px;

        > div {
            max-width: 514px;
            width: 100%;
        }
    }

    &__input-field {
        margin-top: 8px;
    }

    &__add-btn {
        margin-top: 76px;
        display: flex;
        justify-content: center;
        max-width: 1056px;

        button {
            padding: 18px 38px;
        }
    }

    @media (max-width: 590px) {
        &__wrapper-field{
            flex-direction: column;
            gap: 15px;
        }
    }
    @media (max-width: 490px) {
        &__add-btn{
            margin-top: 26px;
            button{
                width: 100%;
            }
        }
    }
}

.q-card.traffic-source__wrapper {
    border-radius: 22px;
}
</style>