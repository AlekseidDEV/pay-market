<script setup>
defineProps({
    texts: {
        type: Object,
        required: true
    },
    nameTip: {
        type: String,
        required: true,
    }
})
</script>

<template>
  <span>
    <q-icon
      class="icon"
      name="help"
      size="20px"
    />
    <q-tooltip>
      {{ texts[nameTip] }}
    </q-tooltip>
  </span>
</template>

<style scoped lang="scss">
.icon{
    color: #B7B7BA;
    margin-left: 15px;
    cursor: pointer;
}

span{
    position: relative;
}
</style>