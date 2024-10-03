<script setup>
import SettingsLists from '@/components/SettingsPage/SettingsLists.vue';
import SettingsPartnerDetails from '@/components/SettingsPage/SettingsPartnerDetails.vue';
import SettingsSteps from '@/components/SettingsPage/SettingsSteps.vue';

import { ref } from 'vue';

const tabs = new Map([
  ['lists', { label: 'Списки', component: SettingsLists }],
  ['partner-details', { label: 'Реквизиты партнеров', component: SettingsPartnerDetails }],
  ['steps', { label: 'Шаги', component: SettingsSteps }],
])

const currentTab = ref('lists')


</script>

<template>
  <q-page class="settings-page__wrapper">
    <div class="q-pt-xl">
      <h1 class="text-white">
        Настройки портала
      </h1>
    </div>
    <q-tabs
      v-model="currentTab"
      :stretch="true"
      breakpoint="0"
      indicator-color="red-13"
      align="left"      
      class="text-white"
      no-caps
    >
      <q-tab
        v-for="tab in tabs.keys()"
        :key="`key_${tab}}`"
        :name="tab"
        :ripple="false"
        :label="tabs.get(tab).label"
        :color="currentTab == tab ? 'red-13' : 'grey-13'"        
      />
    </q-tabs>
    <q-tab-panels 
      v-model="currentTab"      
    >
      <q-tab-panel
        :name="currentTab"
        class="bg-purple-11 q-pa-none q-pt-lg"
      >
        <component :is="tabs.get(currentTab).component" />
      </q-tab-panel>
    </q-tab-panels>    
  </q-page>
</template>

<style lang="scss" scoped>
.settings-page__wrapper {
  max-width: 1130px;
  width: 100%;
  margin: 0 auto;

  // .q-tab-panel {
  //   min-height: 180px;
  // }
}
</style>