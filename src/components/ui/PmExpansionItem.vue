<script setup>
    defineProps({
        labels: {
            type: Array,
            required: true,
            default: () => []
        },
        content: {
            type: Array,
            required: true,
            default: () => []
        }
    })
</script>

<template>
  <q-list>
    <q-expansion-item
      v-for="(label, index) of labels"
      :key="label"
      :label="label"
      :expand-separator="true"
      group="item"
    >
      <q-card-section>
        <slot
          name="item-section"
          :sectionValue="content[index]"
        />
      </q-card-section>
    </q-expansion-item>
  </q-list>
</template>

<style lang="scss">

</style>