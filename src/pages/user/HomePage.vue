<script setup>

import { useMainStore } from "@/core/stores/index.js";
import { inject, onMounted, ref } from "vue";
import UserWalletPrewiew from "@/components/common/UserWalletPrewiew.vue";
import HomeTableContainer from "@/components/HomePage/HomeTableContainer.vue";
import HomeOfferPreview from "@/components/HomePage/HomeOfferPreview.vue";

const store = useMainStore();
const user = store.getUser;

const $http = inject("$http");

const isHomeOfferPreview = ref(false);
const containerComponentRef = ref(null)

const smoothScroll = () => {
    containerComponentRef.value.targetScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    })
}

onMounted(async () => {
    const { error, data } = await $http.offerIssetByUser();

    if (error) {
        console.error("Error: " + error);
        return;
    }

    if (data.en) {
        isHomeOfferPreview.value = false;
    } else {
        isHomeOfferPreview.value = true;
    }
});
</script>

<template>
  <q-page class="home-page__wrapper page-container">
    <div>
      <h1>Здравствуйте, {{ user?.profile?.i }} 🖐</h1>
      <UserWalletPrewiew
        :show-btn="true"
      />
      <HomeOfferPreview
        v-if="isHomeOfferPreview"
        @scrollToTable="smoothScroll"
      />
      <HomeTableContainer ref="containerComponentRef" />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.home-page__wrapper {
    margin-top: 53px;
    padding: 0px 10px;
}

@media (max-width: 525px) {
    h1 {
        font-size: 24px;
        line-height: 45px;
    }
}
</style>