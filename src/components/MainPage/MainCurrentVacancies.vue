<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import {ref, watch } from "vue";
import { carouselAnimate } from "@/utils/carouselAnimate.js";
import { useRouter } from "vue-router";

const curentSlide = ref('hero-0')
const activeSlideRef = ref(null)

const router = useRouter()

const slides = [
    {name: 'hero-0', text: 'Крутые специалисты', color: '#2b4fbf'},
    {name: 'hero-1', text: ' Affiliate менеджеры', color: '#693dca'},
    {name: 'hero-2', text: 'Менеджеры по работе с рекламодателями', color: '#b53ba4'},
    {name: 'hero-3', text: 'Рассыльщики Telegram, WhatsApp', color: '#25b665'},
]

watch(curentSlide, (newValie) => {
    carouselAnimate(+newValie.slice(-1), slides)
})
</script>

<template>
  <div class="main-current-vacancies__wrapper">
    <div class="main-current-vacancies__content block-container">
      <h2>Мы ищем вас,</h2>
      <div class="main-current-vacancies__carousel">
        <div
          class="wrapper-carousel"
        >
          <q-carousel
            v-model="curentSlide"
            vertical
            infinite
            :autoplay="3000"
            animated
            height="100px"
            class="text-teal shadow-1 rounded-borders"
          >
            <q-carousel-slide
              v-for="slide of slides"
              :key="slide.name"
              ref="activeSlideRef"
              :name="slide.name"
              :class="slide.name"
              :data-color="slide.name"
            >
              <h2>{{ slide.text }}</h2>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="main-current-vacancies__actions">
        <DefaultBtn
          :border="false"
          @click="router.push({name: 'vacancies-page'})"
        >
          Хочу работать с вами
        </DefaultBtn>
        <a
          href="https://t.me/nik_gor86"
          target="_blank"
        >
          <i class="pm-telegram" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-current-vacancies{
    &__wrapper{
        margin-top: 80px;
        padding: 0 10px;
        @media (max-width: 490px) {
            margin-top: 40px;
        }
    }
    &__content{
        > h2 {
            font-size: 30px;
            margin-bottom: 40px;
            text-align: center;
        }
    }
    &__carousel{
        display: flex;
        justify-content: center;
    }
    &__actions{
        margin-top: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        button:first-child{
            width: 180px;
            height: 42px;
        }


        a{
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #8c8b8e;
            border-radius: 8px;
        }
    }
}
</style>