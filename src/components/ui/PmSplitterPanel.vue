<script setup>
defineProps({
    limit: {
        type: Array,
        required: false,
        default: () => [25, 25]
    },
    tabContent: {
        type: Array,
        required: false,
        default: () => []
    },
    panelContent: {
        type: Array,
        required: false,
        default: () => []
    },
    splitterHeight: {
        type: String,
        required: false,
        default: ''
    }
})

const tab = defineModel('currentTab')
const splitterModel = defineModel('splitSize')
</script>

<template>
  <q-splitter
    v-model="splitterModel"
    :style="`height: ${splitterHeight};`"
    :limits="limit"
    class="pm-splitter-panel"
  >
    <template #before>
      <q-tabs
        v-model="tab"
        vertical
        :no-caps="true"
        align="left"
        indicator-color="transparent"
      >
        <q-tab
          v-for="item of tabContent"
          :key="item"
          :name="item.name"
          :label="item.label"
          :icon="item.icon"
        />
      </q-tabs>
    </template>

    <template #after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel
          v-for="panel of panelContent"
          :key="panel.nameTab"
          :name="panel.nameTab"
        >
          <slot
            name="panel-content"
            :panelValue="panel"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<style lang="scss">

</style>