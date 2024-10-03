<script setup>
//
</script>

<template>
  <q-footer class="the-footer__wrapper ">
    <div class="layout-container q-px-md q-py-md q-py-md-lg">
      <p :class="$q.screen.gt.sm ? 'text-left' : 'text-center'">
        © Pay-market.ru 2023. Все права защищены
      </p>
    </div>
  </q-footer>
</template>

<style lang="scss">
.the-footer__wrapper {
  p {
    font-size: 15px;
    color: #ffffffb4;
  }
}
</style>
