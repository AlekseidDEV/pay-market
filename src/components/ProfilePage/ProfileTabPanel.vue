<script setup>
import ProfileUserData from "@/components/ProfilePage/ProfileUserData.vue";
import PartnerDetailsList from '@/components/common/partner_details/PartnerDetailsList.vue';

import { ref } from "vue";

const tabs = ref("userData")
const tabsValue = {
  userData: ProfileUserData,  
  userDetailsList: PartnerDetailsList
}

</script>

<template>
  <div class="profile-tab-panel__wrapper">
    <q-tabs
      v-model="tabs"
      indicator-color="red-13"
      align="left"
      class="profile-tab-panel__tabs-menu"
    >
      <q-tab
        :ripple="false"
        :no-caps="true"
        name="userData"
      >
        Данные пользователя
      </q-tab>      
      <q-tab
        :ripple="false"
        :no-caps="true"
        name="userDetailsList"
      >
        Реквизиты
      </q-tab>
    </q-tabs>
    <q-card class="profile-tab-panel__card">
      <component :is="tabsValue[tabs]" />
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.profile-tab-panel {
  &__wrapper {
    margin-top: 54px;
  }

  &__tabs-menu {
    border-bottom: 1px solid rgb(30, 27, 46);
    margin-bottom: 27px;
  }

  &__card {
    margin-top: 27px;
    border-radius: 22px;
  }
}
</style>