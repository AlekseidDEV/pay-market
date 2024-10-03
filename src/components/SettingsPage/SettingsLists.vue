<script setup>
import  SettingsListTargetActions        from './SettingsListTargetActions.vue';
import  SettingsListCountries            from './SettingsListCountries.vue';
import  SettingsListOffers               from './SettingsListOffers.vue'
//import  SettingsListCategories           from './SettingsListCategories.vue'
//import  SettingsListTrafficSources       from './SettingsListTrafficSources.vue';
import  SettingsListOffersCategories     from './SettingsListOffersCategories.vue';

import { ref }    from 'vue';

const currentTab = ref('target-actions')

const tabs = new Map([
  ['target-actions',    { label: 'Целевое действие',  component: SettingsListTargetActions }],
  ['offer-catgeories',  { label: 'Категории офферов', component: SettingsListOffersCategories }],
  ['countries',         { label: 'Страны',            component: SettingsListCountries }],
  //['traffic-sources',   { label: 'Источники трафика', component: SettingsListTrafficSources }],
  ['offers',            { label: 'Офферы',            component: SettingsListOffers }],
  //['categories',      { label: 'Категории',         component: SettingsListCategories }]
])
</script>


<template>
  <div class="settings-list__wrapper">
    <div>
      <q-card        
        bordered
      >
        <q-card-section class="q-py-lg">
          <q-tabs
            v-model="currentTab"
            dense            
            active-color="transparent"
            active-bg-color="transparent"
            indicator-color="transparent"
            breakpoint
            align="left"
            no-caps
          >
            <q-tab
              v-for="tab in tabs.keys()"
              :key="`key_${tab}}`"
              :name="tab"
              :ripple="false"
            >
              <q-chip
                outline
                clickable
                :label="tabs.get(tab).label"
                size="lg"                                           
                :color="currentTab == tab ? 'red-13' : 'grey-13'"
              />
            </q-tab>
          </q-tabs>
        </q-card-section>
        <q-card-section>
          <q-tab-panels
            v-model="currentTab"            
          >
            <q-tab-panel
              class="bg-purple-10"
              :name="currentTab"
            >
              <component :is="tabs.get(currentTab).component" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
.settings-list__wrapper {
  .q-tab  {
    .q-focus-helper {
      visibility: hidden;      
    }    
  }
}
</style>
