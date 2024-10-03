<script setup>
  import {ref} from "vue";
  import PmSplitterPanel from "@/components/ui/PmSplitterPanel.vue";
  import PmExpansionItem from "@/components/ui/PmExpansionItem.vue";

  import {Screen} from "quasar";

  const currentTabValue = ref('one')
  const spliterSize = ref(30)

  const tabsValue = ref([
      {name: "one", label: 'Личный кабинет', icon: 'arrow_outward'},
      {name: "two", label: 'Реферальная ссылка', icon: 'arrow_outward'},
      {name: "free", label: 'Возвращаем клиентов', icon: 'arrow_outward'},
      {name: "four", label: 'Умные витрины для финансовых офферов', icon: 'arrow_outward'},
      {name: "five", label: 'API', icon: 'arrow_outward'},
  ])

  const listContent = ref([
      {img: '/images/panelImg1.png', title: 'Личный кабинет', text: 'Удобный интерфейс, понятная статистика и простой выбор офферов делают нашу платформу идеальной для работы веб мастеров', nameTab: 'one'},
      {img: '/images/panelImg2.png', title: 'Реферальная ссылка', text: 'Индивидуальная ссылка с вашими метками. При переходе по ней пользователь закрепляется за вами на некоторое время. Подходит для любого сайта, блога, социальных сетей или рассылок', nameTab: 'two'},
      {img: '/images/panelImg3.png', title: 'Возвращаем клиентов', text: 'Если юзер не привязал карту, система автоматически пришлёт ему SMS', nameTab: 'free'},
      {img: '/images/panelImg4.png', title: 'Умные витрины для финансовых офферов', text: 'Удобный и понятный конструктор витрин. Создайте витрину, которая будет конвертировать ваш трафик лучше всего. Без дизайнеров, верстальщиков и возни с хостингом', nameTab: 'four'},
      {img: '/images/panelImg5.png', title: 'API', text: 'Мы разработали API для обмена данными между нашими сервисами и любыми другими', nameTab: 'five'}
  ])
</script>

<template>
  <div class="main-advanteg-panel__wrapper block-container">
    <h2>Технологические преимущества <span>Pay-market</span></h2>
    <q-card class="main-advanteg-panel__card">
      <PmSplitterPanel
        v-if="Screen.width > 700"
        v-model:current-tab="currentTabValue"
        v-model:split-size="spliterSize"
        :tab-content="tabsValue"
        :panel-content="listContent"
        :limit="[32, 32]"
        splitter-height="370px"
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
          'Умные витрины для финансовых офферов',
          'API',
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
  </div>
</template>

<style lang="scss">
.main-advanteg-panel{
    &__wrapper{
        padding: 0 10px;

        > h2 {
            margin-bottom: 35px;
            width: 100%;
            span {
                font-size: inherit;
                background: linear-gradient(90deg, #A855F7 0%, #EC4899 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: transparent;
                white-space: nowrap;
                font-weight: 800;
                position: relative;
                &::after{
                    position: absolute;
                    content: '';
                    top: 30px;
                    left: 0;
                    width: 130px;
                    height: 7px;
                    background: url("/icons/high-risk-lines.svg") no-repeat center/cover;
                }
            }
        }
    }
}
  .q-card.main-advanteg-panel__card{
      border-radius: 22px;
  }
</style>