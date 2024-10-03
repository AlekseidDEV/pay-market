<script setup>
import { Screen } from "quasar";

const rowsContent = new Map([
    [1, {cardsRow: [
            {colClass: 'col-4', title: 'Беттинг', description: 'Ставки на спорт', img: '/images/cat5.png'},
            {colClass: 'col-4', title: 'Платный сервис подбора займов', description: 'Подключение рекурентных платежей', img: '/images/cat9.png'},
            {colClass: 'col-3', title: 'Онлайн – казино', description: 'Азартные игры онлайн', img: '/images/cat3.png'}
        ]}],
    [2, {cardsRow: [
            {colClass: 'col-4', title: 'Инфо – продукты', description: 'Онлайн курсы, инфо продукты', img: '/images/cat2.png'},
            {colClass: 'col-6', title: 'Контент 18+', description: 'Продукты для взрослых', img: '/images/cat4.png'},
        ]}],
    [3, {cardsRow: [
            {colClass: 'col-6', title: 'Инвестиции', description: 'Инвестиционные проекты повышенного риска', img: '/images/cat6.png'},
            {colClass: 'col-4', title: 'DATING', description: 'Онлайн знакомства', img: '/images/cat8.png'},
        ]}],
    [4, {cardsRow: [
            {colClass: 'col-4', title: 'Крипто биржи', description: 'Онлайн биржи крипто валют', img: '/images/cat7.png'},
            {colClass: 'col-6', title: 'Контент 18+', description: 'Продукты для взрослых', img: '/images/cat1.png'},
        ]}],
])

const positionsRow = ['end', 'end', 'start', 'end']
</script>

<template>
  <div class="high-risk-category-card__wrapper">
    <div class="block-container high-risk-category-card__content">
      <div
        v-for="rowKey in rowsContent.size"
        :key="rowKey"
        class="row high-risk-category-card__row-card"
        :class="`justify-${positionsRow[rowKey - 1]}`"
      >
        <div
          v-for="item of rowsContent.get(rowKey).cardsRow"
          :key="item.title"
          :class="Screen.width > 755 ? item.colClass : 'col-11'"
        >
          <q-card
            :style="`
                       background: url(${item.img})
                       no-repeat
                       center/cover;
                `"
          >
            <div class="flex h-full column justify-between q-px-md q-py-md">
              <h2>{{ item.title }}</h2>
              <div class="flex justify-between items-center no-wrap">
                <p>{{ item.description }}</p>
                <span class="high-risk-category-card__preview-btn">
                  <q-icon
                    name="arrow_outward"
                    size="20px"
                  />
                </span>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.high-risk-category-card {
    &__wrapper {
        margin-top: 80px;
    }

    &__content {
        padding: 0px 10px;
    }

    &__preview-btn {
        padding: 10px;
        border-radius: 50px;
        border: 1px solid white;
        max-height: 43px;
    }

    &__row-card {
        position: relative;
        gap: 15px 25px;
        margin-bottom: 30px;
        .q-card{
            height: 378px;
        }

        p {
            font-size: 18px;
            max-width: 230px;
            margin-bottom: 0;
        }
    }

    @media (max-width: 835px) {
        &__row-card {
            p {
                max-width: 170px;
            }
        }
    }

    @media (max-width: 755px) {
        &__row-card {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 490px) {
        &__wrapper {
            margin-top: 40px;
        }
    }
}

.high-risk-category-card__row-card {
    .q-card {
        border-radius: 22px;
    }
}

</style>