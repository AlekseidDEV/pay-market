<script setup>

  import {ref} from "vue";

  const emits = defineEmits(["change-filter"]);

  const filterId = ref(3);

  const categoryFilter = [
    {label: "Платный брокер", value: 3},
    {label: "SP офферы", value: 5},
    {label: "Дейтинг", value: 4},
    {label: "Гемблинг", value: 6},
  ];
  const specialFilter = [
    {label: "Подключенные", value: 1},
    {label: "Избранное", value: 2},
  ];

</script>

<template>
  <q-tabs
    v-model="filterId"
    class="home-table-filter__wrapper"
    active-color="transparent"
    active-bg-color="transparent"
    indicator-color="transparent"
    align="left"
    no-caps
    :switch-indicator="false"
    @update:model-value="emits('change-filter', filterId)"
  >
    <div class="home-table-filter__tab">
      <q-tab
        v-for="filter of categoryFilter"
        :key="filter.label"
        :name="filter.value"
        :ripple="false"
      >
        <q-chip
          outline
          clickable
          :label="filter.label"
          size="lg"
          :color="filterId === filter.value ? 'red-13' : 'grey-13'"
        />
      </q-tab>
    </div>
    <div class="home-table-filter__tab">
      <q-tab
        v-for="filter of specialFilter"
        :key="filter.label"
        :name="filter.value"
        :ripple="false"
      >
        <q-chip
          outline
          clickable
          :label="filter.label"
          size="lg"
          :color="filterId === filter.value ? 'red-13' : 'grey-13'"
        />
      </q-tab>
    </div>
  </q-tabs>
</template>

<style lang="scss">
.home-table-filter {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0px;
  }

  &__wrapper .q-tabs__content {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__tab {
    display: flex;
    flex-wrap: wrap;

    .q-tab {
      padding: 0;
    }

    .q-tab > .q-focus-helper {
      display: none;
    }
  }

  @media (max-width: 505px) {
    &__wrapper .q-tabs__content--align-justify .q-tab {
      flex: none;
    }
  }
}
</style>