<script setup>
import PmSplitterPanel from "@/components/ui/PmSplitterPanel.vue";
import PmExpansionItem from "@/components/ui/PmExpansionItem.vue";
import PmViewCard from "@/components/ui/PmViewCard.vue";

import {Screen} from "quasar";
import {ref} from "vue";

const currentTabValue = ref('one')
const spliterSize = ref(30)

const tabsValue = ref([
    {name: "one", label: 'Принимайте регулярные платежи по подписке', icon: 'arrow_outward'},
    {name: "two", label: 'Массовые выплаты', icon: 'arrow_outward'},
    {name: "free", label: 'Автоматический вывод', icon: 'arrow_outward'},
])

const listContent = ref([
    {img: '/images/panelImg1.png', title: 'Принимайте регулярные платежи по подписке', text: 'Легко подключить рекуррентные платежи — после успешной оплаты подписка создается автоматически. Устанавливайте график, по которому будет проходить регулярная онлайн-оплата.', nameTab: 'one'},
    {img: '/images/panelImg2.png', title: 'Массовые выплаты', text: 'Физическим лицам, фрилансерам, блогерам, самозанятым, разработчикам. Для CPA сетей, МФО, сервисов доставки или логистических компаний.', nameTab: 'two'},
    {img: '/images/panelImg3.png', title: 'Автоматический вывод', text: 'Вывод средств раз в день на карте, банковские счета или Qiwi. Настраивайте автоматический вывод по достижению определенной суммы или мгновенно', nameTab: 'free'},
])

const cardContent = [
    {text: 'Это возможность профессионально развиваться, участвовать в масштабных и прогрессивных проектах, вместе с нами решать сложные и интересные задачи.', icon: {name: 'stars', color: '#fc803a', size: '27px'}, background: '/images/card-bg-left.png'},
    {text: 'Мы предоставляем нашим сотрудникам максимум возможностей, все необходимые ресурсы и поддерживаем во всех начинаниях.', icon: {name: 'settings', color: '#2abd40', size: '27px'}, background: '/images/card-bg-right.png'}
]
</script>

<template>
  <div class="advertiser-info-block__wrapper">
    <div class="block-container">
      <q-card class="advertiser-info-block__card">
        <PmSplitterPanel
          v-if="Screen.width > 700"
          v-model:current-tab="currentTabValue"
          v-model:split-size="spliterSize"
          :tab-content="tabsValue"
          :panel-content="listContent"
          :limit="[32, 32]"
          splitter-height="370px"
        >
          <template #panel-content="{panelValue}">
            <div class="panel-content">
              <q-img
                loading="lazy"
                :src="panelValue.img"
                alt="img"
              />
              <div>
                <h3>{{ panelValue.title }}</h3>
                <p>{{ panelValue.text }}</p>
              </div>
            </div>
          </template>
        </PmSplitterPanel>
        <PmExpansionItem
          v-else
          :labels="[
            'Принимайте регулярные платежи по подписке',
            'Массовые выплаты',
            'Автоматический вывод',
          ]"
          :content="listContent"
        >
          <template #item-section="{sectionValue}">
            <div class="expansion-content">
              <img
                :src="sectionValue.img"
                alt="img"
              >
              <div>
                <h3>{{ sectionValue.title }}</h3>
                <p>{{ sectionValue.text }}</p>
              </div>
            </div>
          </template>
        </PmExpansionItem>
      </q-card>

      <div class="advertiser-info-block__descr-card">
        <h2>
          Выход на новые рынки
        </h2>

        <div class="descr-card__wrapper">
          <PmViewCard
            v-for="card of cardContent"
            :key="card.text"
            :icon="card.icon"
            :text="card.text"
            :bg-card="card.background"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.advertiser-info-block{
    &__wrapper{
        margin-top: 80px;
        padding: 0 10px;
    }
    &__descr-card{
        margin-top: 80px;
        text-align: center;

        h2 {
            font-size: 30px;
            line-height: 130%;
        }

        .descr-card__wrapper{
            margin-top: 35px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px 35px;
            > div {
                max-width: 480px;
                width: 100%;
                height: 380px;

                p {
                    font-size: 18px;
                    max-width: 320px;
                }
            }
        }
    }
}

.q-card.advertiser-info-block__card{
    border-radius: 22px;
}
</style>