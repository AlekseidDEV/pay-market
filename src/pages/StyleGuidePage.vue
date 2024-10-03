<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import PmTable from "@/components/ui/Table/PmTable.vue";
import PmTheadRow from "@/components/ui/Table/PmTheadRow.vue";
import PmBottomRow from "@/components/ui/Table/PmBottomRow.vue";
import PmOffersTable from "@/components/ui/Table/TableOffers.vue";
import PmToolTip from "@/components/ui/Table/TableToolTip.vue";

const data = [
    {
        "id": 1,
        name: 'Alex'
    },
    {
        "id": 1,
        name: 'Alex'
    },
]

const data1 = [
    {
        "number": 1,
        name: 'Alex',
        tg: '@fffff',
        phone: '+7 999 999 99 99',
        sum: '10000'
    },
    {
        "number": 1,
        name: 'John',
        tg: '@fffff',
        phone: '+7 999 999 99 99',
        sum: '10000'
    },
    {
        "number": 1,
        name: 'Tom',
        tg: '@fffff',
        phone: '+7 999 999 99 99',
        sum: '10000'
    },
]

const data2 = [
    {
        "number": 1,
        name: 'John',
        tg: '@fffff',
        phone: '+7 999 999 99 99',
        revShare: '70',
        cpl: '70',
        cpa: '70',
        sum: '10000'
    },
    {
        "number": 1,
        name: 'John',
        tg: '@fffff',
        phone: '+7 999 999 99 99',
        revShare: '80',
        cpl: '80',
        cpa: '80',
        sum: '10000'
    },
]
const data3 = [
    {
        id: 123,
        offer: 'kakoy to offer',
        img: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-q635-p-andegraund-png-15.png',
        reward: 480,
        cr: 11,
        epc: 5,
        epl: 76,
        cpa: 12,
    },
    {
        id: 124568,
        offer: 'kakoy to offer',
        img: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-q635-p-andegraund-png-15.png',
        reward: 480,
        cr: 11,
        epc: 5,
        epl: 76,
        cpa: 12,
    }
]

const data4 = []
</script>

<template>
  <q-page class="style-guide-page__wrapper">
    <div>
      <h2>Style guide</h2>
    </div>
    <div class="style-guide-page__content">
      <div class="style-guide-page__headers q-px-lg">
        <h3>Headers and font-sizes</h3>
      </div>      
      <div class="style-guide-page__icons q-px-lg">
        <h3>Icons</h3>
        <div class="text-orange">
          <q-icon
            name="icon-pm-user-plus-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-trash"
            size="40px"
          />
          <q-icon
            name="icon-pm-target-bold"
            size="40px"
          />
          <q-icon
            name="icon-pm-star-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-star-empty"
            size="40px"
          />
          <q-icon
            name="icon-pm-source-approve-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-shield"
            size="40px"
          />
          <q-icon
            name="icon-pm-shevron-down"
            size="40px"
          />
          <q-icon
            name="icon-pm-rubel-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-question"
            size="40px"
          />
          <q-icon
            name="icon-pm-logout"
            size="40px"
          />
          <q-icon
            name="icon-pm-login"
            size="40px"
          />
          <q-icon
            name="icon-pm-location-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-globe"
            size="40px"
          />
          <q-icon
            name="icon-pm-globe-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-edit"
            size="40px"
          />
          <q-icon
            name="icon-pm-cross"
            size="40px"
          />
          <q-icon
            name="icon-pm-copy"
            size="40px"
          />
          <q-icon
            name="icon-pm-calendar-filled"
            size="40px"
          />
          <q-icon
            name="icon-pm-arrow-right"
            size="40px"
          />
          <q-icon
            name="icon-pm-arrow-circle-right"
            size="40px"
          />
          <q-icon
            name="icon-pm-arrow-circle-left"
            size="40px"
          />
          <q-icon
            name="icon-pm-approve"
            size="40px"
          />
        </div>
      </div>
      <div class="style-guide-page__fields q-px-lg">
        <h3>Form fields</h3>
      </div>
      <div class="style-guide-page__buttons q-px-lg">
        <h3>Buttons</h3>
      </div>
      <div class="style-guide-page__pickers q-px-lg">
        <h3>Pickers</h3>
      </div>
      <div class="style-guide-page__icons q-px-lg">
        <h3>Colors</h3>
      </div>
    </div>


    <div>
      <PmOffersTable
        :loading="true"
        :hide-bottom="false"
        :rows="data4"
        :column="[
          {name: 'id', label: 'ID', field: 'id', align: 'center', autoWith: true},
          {name: 'offer', label: 'Оффер', field: 'offer', align: 'center', autoWith: false},
          {name: 'reward', label: 'Вознаграждение и целевое действие', field: 'reward', align: 'center', autoWith: false},
          {name: 'cr', label: 'CR', field: 'cr', align: 'center', autoWith: true},
          {name: 'epc', label: 'EPC', field: 'epc', align: 'center', autoWith: true},
          {name: 'epl', label: 'EPL', field: 'epl', align: 'center', autoWith: true},
          {name: 'cpa', label: 'CPA', field: 'cpa', align: 'center', autoWith: true}
        ]"
      >
        <template #tooltip-slot="{colName}">
          <PmToolTip
            v-if="['cr', 'epc', 'epl', 'cpa',].includes(colName)"
            :texts="{
              cr: '% целевых действий из кликов',
              epc: 'заработок с одного клика',
              epl: 'заработок с одной заявки',
              cpa: 'заработок с одной привязка карты'
            }"
            :nameTip="colName"
          />
        </template>

        <template #body-td-slot="{colName}">
          <PmToolTip
            v-if="['epl', 'cpa',].includes(colName)"
            :name-tip="colName"
            :texts="{
              epl: 'заработок с одной заявки',
              cpa: 'заработок с одной привязка карты'
            }"
          />
        </template>
      </PmOffersTable>
    </div>
    <div
      class="test-container"
    >
      <PmTable
        :rows="data4"
        :loading="false"
        :columns="[
          {name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: false},
          {name: 'name', label: 'название', field: 'name', align: 'left', autoWith: false},
          {name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: false},
          {name: 'name', label: 'название', field: 'name', align: 'left', autoWith: false},
          {name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: false},
          {name: 'name', label: 'название', field: 'name', align: 'left', autoWith: false},
          {name: 'btn', label: '', field: '', autoWith: true}
        ]"
      >
        <template #body-cell-cust="{colName}">
          <DefaultBtn
            v-if="colName === 'btn'"
            v-slot
            :disable="false"
            class="btn"
          >
            <q-icon
              name="icon-pm-edit"
              size="20px"
            />
          </DefaultBtn>
        </template>
      </PmTable>
    </div>
    <div
      class="test-container"
    >
      <PmTable
        :pagination="{rowsPerPage: 2}"
        :columns="[
          {name: 'id', label: 'N', field: 'number', align: 'left', autoWith: false},
          {name: 'name', label: 'Имя в системе', field: 'name', align: 'left', autoWith: false},
          {name: 'tg', label: 'Telegram', field: 'tg', align: 'left', autoWith: false},
          {name: 'phone', label: 'Телефон', field: 'phone', align: 'left', autoWith: false},
          {name: 'sum', label: 'Сумма к возмещению', field: 'sum', align: 'left', autoWith: false},
          {name: 'btnSlot1', label: '', field: 'id', align: 'left', autoWith: true},
          {name: 'btnSlot2', label: '', field: 'id', align: 'left', autoWith: true}
        ]"
        :rows="data1"
      >
        <template #btn-action-first="{colName}">
          <DefaultBtn
            v-if="colName === 'btnSlot1'"
            v-slot
            :disable="false"
            class="btn-2"
            bg-color="pink"
          >
            click me
          </DefaultBtn>
        </template>
        <template #btn-action-second="{colName}">
          <DefaultBtn
            v-if="colName === 'btnSlot2'"
            v-slot
            :disable="false"
            class="btn-2"
            bg-color="grey"
          >
            click me
          </DefaultBtn>
        </template>
      </PmTable>
    </div>
    <div
      class="test-container"
    >
      <PmTable
        :columns="[
          {name: 'number', label: 'N', field: 'number', align: 'center'},
          {name: 'name', label: 'Имя в системе', field: 'name', align: 'center'},
          {name: 'tg', label: 'Telegram', field: 'tg', align: 'center'},
          {name: 'phone', label: 'Телефон', field: 'phone', align: 'center'},
          {name: 'revShare', label: '% по revShare ', field: 'revShare', align: 'center'},
          {name: 'cpl', label: 'Цена за лид (CPL) ', field: 'cpl', align: 'center'},
          {name: 'cpa', label: 'Цена за подписку (CPA)', field: 'cpa', align: 'center'},
          {name: 'sum', label: 'Сумма к возмещению', field: 'sum', align: 'center'}
        ]"
        :rows="data2"
      >
        <template #body-cell-cust="{colName}">
          <DefaultBtn
            v-if="['revShare', 'cpl' , 'cpa'].includes(colName)"
            v-slot
            class="btn-3"
            :disable="false"
            bg-color="dark-grey"
          >
            <q-icon
              name="icon-pm-edit"
              size="9px"
            />
          </DefaultBtn>
        </template>
      </PmTable>
    </div>
    <div
      class="test-container"
    >
      <PmTable
        class="pm-table__grey-head"
        :columns="[
          {name: 'number', label: 'N', field: 'number', align: 'center'},
          {name: 'name', label: 'Имя в системе', field: 'name', align: 'center'},
          {name: 'tg', label: 'Telegram', field: 'tg', align: 'center'},
          {name: 'phone', label: 'Телефон', field: 'phone', align: 'center'},
          {name: 'revShare', label: '% по revShare ', field: 'revShare', align: 'center'},
          {name: 'cpl', label: 'Цена за лид (CPL) ', field: 'cpl', align: 'center'},
          {name: 'cpa', label: 'Цена за подписку (CPA)', field: 'cpa', align: 'center'},
          {name: 'sum', label: 'Сумма к возмещению', field: 'sum', align: 'center'}
        ]"
        :rows="data2"
      >
        <template #header-top>
          <PmTheadRow
            :cells="[
              {name: 'number', size: 1},
              {name: 'info', size: 3},
              {name: 'percent', size: 3},
              {name: 'summary', size: 1},
            ]"
          />
        </template>
        <template #count-bottom>
          <PmBottomRow
            :data="data2"
            :cells="[
              {name: 'Итого:', size: 4, align: 'left'},
              {name: 'revShare', size: 1, type: 'persent', align: 'center'},
              {name: 'cpl', size: 1, type: 'sum', align: 'center'},
              {name: 'cpa', size: 1, type: 'sum', align: 'center'},
              {name: 'sum', size: 1, type: 'sum', align: 'center'},
            ]"
          />
        </template>
      </PmTable>
    </div>    
  </q-page>
</template>

<style lang="scss" scoped>
.test-container{
    margin-top: 15px;
    padding: 5px;
    border-radius: 22px;
    background: #1e1b2e;
}

.mt-y{
    margin: 3.5rem  0;
}

.style-guide-page__wrapper {
  max-width: 1130px;
  margin: 0 auto;
}

.btn{
    padding: 6px 6px;
}

.btn-2{
    padding: 10px 40px;
}

.btn-3{
    margin-left: 5px;
    padding: 2px 5.5px;
}

.btn-tip{
    margin-left: 25px;
}
</style>
