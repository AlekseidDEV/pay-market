<script setup>

</script>

<template>
  <footer>
    <p class="copy-right">
      © Pay-market.ru 2023.Все права защищены
    </p>
  </footer>
</template>

<style scoped lang="scss">
footer{
  flex-grow: 1;
  max-height: 88px;
  padding: 34px 0px;
  margin-top: auto;
  padding-top: 100px;
  position: relative;
}

p{
  font-weight: 400;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 414px) {
  p{
    text-align: center;
  }
}
</style>