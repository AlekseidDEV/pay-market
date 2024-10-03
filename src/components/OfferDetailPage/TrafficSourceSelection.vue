<script setup>
const model = defineModel();

const options = [
    { label: "Своё значение", value: 'default' },
    { label: "Яндекс.Директ", value: 'Яндекс.Директ'},
    { label: "Google Adwords", value: 'Google Adwords'},
    { label: "Вконтакте", value: "Вконтакте" },
    { label: "Telegram", value: "Telegram" },
    { label: "Target My.com", value: "Target My.com" },
];
</script>

<template>
  <div class="traffic-source-selection__wrapper">
    <q-option-group
      v-model="model"
      class="traffic-source-selection__radion-btns"
      :options="options"
    />
  </div>
</template>

<style lang="scss">
.traffic-source-selection {
    &__radion-btns {
        margin-top: 30px;
        display: flex;
        gap: 5px 25px;
        justify-content: start;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 21px;
    }
}
</style>