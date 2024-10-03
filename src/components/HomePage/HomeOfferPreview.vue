<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

const emits = defineEmits(['scroll-to-table'])
</script>

<template>
  <div class="offers-preview">
    <h2>Вы пока не начали работать с продуктами 😎</h2>
    <p>Начните работать с продуктами и информация о них появится здесь</p>
    <default-btn
      class="offers-preview__btn"
      @click="emits('scroll-to-table')"
    >
      Смотреть офферы
    </default-btn>
  </div>
</template>

<style scoped lang="scss">
    .offers-preview{
        box-sizing: border-box;
        border: 1px solid rgb(116, 116, 116);
        border-radius: 22px;
        margin-top: 90px;
        text-align: center;
        padding: 62px 15px;
        &__btn{
            padding: 18px 34px;
        }
        p {
            margin: 30px 0px;
        }
        @media (max-width: 525px) {
            margin-top: 31px;
            padding: 30px 15px;

            h2{
                font-size: 20px;
                line-height: 25px;
            }

            p{
                margin: 15px 0px;
            }
        }
    }
</style>