<script setup>
  import { useQuasar } from 'quasar'
  import customIcons from '@/custom-icons/customIcons.js'

  const $q = useQuasar()
  $q.iconSet.set(customIcons)
  $q.screen.setSizes({ sm: 320, md: 640, lg: 1280, xl: 1920 })
</script>

<template>
  <router-view />
</template>

<style scoped></style>
