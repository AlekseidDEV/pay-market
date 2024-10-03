<script setup>
  defineProps({
    disable: Boolean,
      bgColor: {
        type: String,
        default: 'pink'
      },
      border: {
        type: Boolean,
          default: true,
          required: false
      }
  })
</script>

<template>
  <button
    :class="[bgColor, border ? '' : 'border-none']"
    :disabled="disable"
    type="submit"
  >
    <slot>
      text btn
    </slot>
  </button>
</template>

<style scoped lang="scss">
@import "src/assets/scss/default-btn-color";
button{
    &:disabled{
        opacity: 1 !important;
    }
}

.border-none{
    border: none;
}
</style>