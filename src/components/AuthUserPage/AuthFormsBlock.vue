<script setup>
  import AuthLogin from "@/components/AuthUserPage/AuthLogin.vue";
  
  import {ref, shallowRef} from "vue";

  const sliceName = shallowRef(AuthLogin)
  const navigateParam = ref(false)

  const changeComponent = (component, paramSlice) => {
    sliceName.value = component

      navigateParam.value = paramSlice
  }
</script>

<template>
  <div>
    <component
      :is="sliceName"
      :param="navigateParam"
      @changeSlice="changeComponent"
    />
  </div>
</template>

<style lang="scss">
.block-form {
  display: flex;
  justify-content: center;
  margin-top: 143px;
  @media (max-width: 445px) {
    margin-top: 31px;
      .pink{
          width: 100%;
      }
  }
}

.form{
    background: #1e1b2e;
    border-radius: 22px;
    max-width: 729px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 58px 10px 87px 10px;
    &__wrapper-cont{
      max-width: 500px;
      width: 100%;
    }
    &__input-block{
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 500px;
      gap: 18px 0;
    }
    & h3 {
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 24px;
      font-weight: 600;
      line-height: 28px;
    }
    & p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
    }
    & span {
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      text-align: center;
    }
    &__title{
      margin-bottom: 25px;
    }
    &__text{
      margin-bottom: 30px;
    }
}

@media (max-width: 414px) {
  h3 {font-size: 18px}
  p {font-size: 14px}
  span {font-size: 14px}
  .form{
    padding: 33px 10px 33px 10px;
  }
}
</style>