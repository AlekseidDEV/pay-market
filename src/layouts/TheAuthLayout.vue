<script setup>
  import AuthHeader from "@/components/Headers/AuthHeader.vue";
  import AuthFooter from "@/components/Footers/AuthFooter.vue";
</script>

<template>
  <div class="container q-px-md">
    <div class="main-wrapper">
      <AuthHeader />
      <router-view />
      <AuthFooter />
    </div>
  </div>
</template>

<style scoped>
.main-wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>