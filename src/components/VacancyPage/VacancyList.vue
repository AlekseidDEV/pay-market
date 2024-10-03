<script setup>

import PmExpansionItem from "@/components/ui/PmExpansionItem.vue";

import { vacanciesDataList } from "@/utils/vacanciesDataList.js";

</script>

<template>
  <div class="vacancy-list__wrapper">
    <div class="vacancy-list__content block-container">
      <h2>Все зависит только от вас</h2>
      <q-card>
        <PmExpansionItem
          :content="vacanciesDataList"
          :labels="[
            'Affilate manager (арбитраж трафика CPA)',
            'Таргетолог',
            'Специалист по рассылкам в Telegram'
          ]"
        >
          <template #item-section="{sectionValue}">
            <div class="vacancy-list__vacancy-description">
              <p>Чем предстоит заниматься:</p>
              <ul>
                <li
                  v-for="text of sectionValue.whatToDo"
                  :key="text"
                >
                  {{ text }}
                </li>
              </ul>
              <div class="vacancy-list__vacancy-requirements">
                <div>
                  <p>Требования:</p>
                  <ul>
                    <li
                      v-for="text of sectionValue.demand"
                      :key="text"
                    >
                      {{ text }}
                    </li>
                  </ul>
                </div>
                <div v-if="sectionValue.wouldPlus.length > 0">
                  <p>Будет плюсом:</p>
                  <ul>
                    <li
                      v-for="text of sectionValue.wouldPlus"
                      :key="text"
                    >
                      {{ text }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </PmExpansionItem>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
.vacancy-list{
    &__wrapper{
        margin-top: 40px;
        margin-bottom: 40px;
        padding: 0 10px;
    }
    &__content{
        .q-card {
            max-width: 918px;
            width: 100%;
            margin: auto;
        }
        .q-card__section{
            padding: 10px 30px;
        }
        .q-list .q-item__label{
            font-size: 16px;
        }
        h2 {
            text-align: center;
            margin-bottom: 30px;
        }
    }
    &__vacancy-description{
        > p {
            font-size: 18px;
        }
        > ul {
            padding-left: 20px;
            max-width: 500px;
        }
    }
    &__vacancy-requirements{
        display: flex;
        margin-top: 20px;
        gap: 20px 20px;
        > div {
            background: #312e43;
            border-radius: 22px;
            padding: 15px 20px;
            > p {
                font-size: 18px;
                margin-bottom: 10px;
            }
            > ul {
                padding-left: 20px;

                li {
                    max-width: 280px;
                }
            }
        }
    }
    
    @media (max-width: 600px) {
        &__vacancy-requirements{
            flex-direction: column;
        }
    }
}

.vacancy-list__wrapper .q-card {
    border-radius: 22px;
}
</style>