<script setup>
import PmSplitterPanel from "@/components/ui/PmSplitterPanel.vue";
import PmExpansionItem from "@/components/ui/PmExpansionItem.vue";

import { Screen } from "quasar";
import { ref } from "vue";

const currentTabValue = ref("one");
const spliterSize = ref(30);

const tabsValue = ref([
    { name: "one", label: "Технологичная платформа", icon: "arrow_outward" },
    { name: "two", label: "Контроль качества трафика", icon: "arrow_outward" },
    { name: "free", label: "Менеджер на связи 24/7", icon: "arrow_outward" },
    { name: "four", label: "Детальная статистика", icon: "arrow_outward" },
]);

const listContent = ref([
    {
        img: "/images/panelImg6.png",
        title: "Технологичная платформа",
        text: "Мы технологичны и можем выстроить процессы специально для вас. Принимаем и передаем реферальный и API-трафик",
        nameTab: "one",
    },
    {
        img: "/images/panelImg7.png",
        title: "Контроль качества трафика",
        text: "Чтобы вы получали клиентов, которые реально заинтересованы в вашем продукте, мы отслеживаем показатели трафика по каждому партнеру в разрезе источников",
        nameTab: "two",
    },
    {
        img: "/images/panelImg8.png",
        title: "Менеджер на связи 24/7",
        text: "Гибкие условия для рекламодателей: оценка продукта, сравнение с конкурентами, обсуждение ставок, договор, интеграция, запуск, постоплата.",
        nameTab: "free",
    },
    {
        img: "/images/panelImg9.png",
        title: "Детальная статистика",
        text: "Доступ к прозрачной статистике кликов, переходов, целевых действий и источников трафика",
        nameTab: "four",
    },
]);
</script>

<template>
  <div class="advertiser-panel__wrapper">
    <div class="block-container">
      <q-card>
        <PmSplitterPanel
          v-if="Screen.width > 700"
          v-model:current-tab="currentTabValue"
          v-model:split-size="spliterSize"
          :tab-content="tabsValue"
          :panel-content="listContent"
          :limit="[32, 32]"
          splitter-height="360px"
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
  </div>
</template>

<style lang="scss">
    .advertiser-panel{
        &__wrapper{
            margin-top: 80px;
            padding: 0 10px;
            @media (max-width: 490px) {
                margin-top: 40px;
            }
        }
    }

    .advertiser-panel__wrapper .q-card{
        border-radius: 22px;
    }
</style>