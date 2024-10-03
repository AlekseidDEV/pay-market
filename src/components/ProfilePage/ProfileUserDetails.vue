<script setup>
import PartnerDetailsContainer from "@/components/common/partner_details/PartnerDetailsContainer.vue";

</script>

<template>
  <div class="profile-user-details__wrapper">
    <q-card-section>
      <h2>Добавление реквизитов</h2>
    </q-card-section>
    <PartnerDetailsContainer />
  </div>
</template>

<style lang="scss">
    .profile-user-details{
        &__wrapper{
            padding: 20px 42px;
        }
        &__block{
            margin-top: 29px;
            display: flex;
            gap: 15px 15px;
        }
        @media (max-width: 750px) {
            &__block{
                flex-direction: column;
            }
        }
        @media (max-width: 450px) {
            &__wrapper{
                padding: 25px 15px;
            }
        }
    }
</style>