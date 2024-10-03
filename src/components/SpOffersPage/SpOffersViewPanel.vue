<script setup>

import { Screen } from "quasar";
import PmSplitterPanel from "@/components/ui/PmSplitterPanel.vue";
import PmExpansionItem from "@/components/ui/PmExpansionItem.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const currentTabValue = ref('one')
const spliterSize = ref(30)

const tabsValue = ref([
    {name: "one", label: 'Микрозаймы', icon: 'arrow_outward'},
    {name: "two", label: 'Потребительское кредитование', icon: 'arrow_outward'},
    {name: "free", label: '[SP] офферы', icon: 'arrow_outward'},
])

const listContent = ref([
    {img: '/images/panelImg10.png', title: 'Микрозаймы', text: 'Сайты работают по подписке, в ходе оформления заявки на микрозайм, клиент привязывает банковскую карту, с которой еженедельно списывается 499 руб.', nameTab: 'one'},
    {img: '/images/panelImg11.png', title: 'Потребительское кредитование', text: 'Этот сайт работает так же по подписке, и так же списывает с клиента по 499 руб. еженедельно. В отличии от микрозаймов, этот сайт легко можно рекламировать в FB', nameTab: 'two'},
    {img: '/images/panelImg12.png', title: '[SP] офферы', text: 'Подключайте [SP] офферы и запускайте трафик из любых источников, без замороченных настроек, прогревов, клоак и всему к чему вы привыкли. Эти офферы белые, их любит модерация и спокойно пропускает.', nameTab: 'free'},
])
</script>

<template>
  <div class="sp-offers-view-panel__wrapper">
    <div class="sp-offers-view-panel__content block-container">
      <q-card class="sp-offers-view-panel__card">
        <PmSplitterPanel
          v-if="Screen.width > 700"
          v-model:current-tab="currentTabValue"
          v-model:split-size="spliterSize"
          :tab-content="tabsValue"
          :panel-content="listContent"
          :limit="[32, 32]"
          splitter-height="365px"
        >
          <template #panel-content="{panelValue}">
            <div class="panel-content">
              <q-img
                loading="lazy"
                :src="panelValue.img"
                alt="img"
              />
              <div>
                <h3>{{ panelValue.title }}</h3>
                <p>{{ panelValue.text }}</p>
              </div>
            </div>
          </template>
        </PmSplitterPanel>
        <PmExpansionItem
          v-else
          :labels="[
            'Личный кабинет',
            'Реферальная ссылка',
            'Возвращаем клиентов',
          ]"
          :content="listContent"
        >
          <template #item-section="{sectionValue}">
            <div class="expansion-content">
              <img
                :src="sectionValue.img"
                alt="img"
              >
              <div>
                <h3>{{ sectionValue.title }}</h3>
                <p>{{ sectionValue.text }}</p>
              </div>
            </div>
          </template>
        </PmExpansionItem>
      </q-card>

      <DefaultBtn
        :border="false"
        @click="router.push({name: 'auth-user-page'})"
      >
        Начать лить
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
    .sp-offers-view-panel{
        &__wrapper{
            padding: 0 10px;
            margin-top: 80px;
        }
        &__content{
            display: flex;
            flex-direction: column;

            button {
                margin: auto;
                margin-top: 40px;
                max-width: 150px;
                width: 100%;
                height: 60px;
            }
        }
        
        @media (max-width: 490px) {
            &__wrapper{
                margin-top: 40px;
            }
        }
    }

    .q-card.sp-offers-view-panel__card{
        border-radius: 22px;
    }
</style>