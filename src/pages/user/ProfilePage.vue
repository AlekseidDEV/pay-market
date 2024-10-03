<script setup>
    import { useMainStore } from "@/core/stores/index.js";
    import ProfileTabPanel from "@/components/ProfilePage/ProfileTabPanel.vue";
    import {Screen} from "quasar";
    import {computed} from "vue";

    const user = useMainStore().getUser

    const userIdtext = computed(() => {
      return Screen.width > 660 ? "ID пользователя" : "ID"
    })
</script>

<template>
  <q-page class="page-container">
    <div class="profile-page__wrapper">
      breadcrumbs...
      <q-card class="profile-page__card">
        <div>
          <h2>
            {{ user.profile.f }}
            {{ user.profile.i }}
            {{ user.profile.o }}
          </h2>
          <p>@{{ user.profile.tg }}</p>
        </div>

        <span> {{ userIdtext }}: {{ user.id }}</span>
      </q-card>
      <ProfileTabPanel />
    </div>
  </q-page>
</template>

<style lang="scss">
.profile-page{
    &__wrapper{
        margin-top: 43px;
        padding: 0px 10px;
        margin-bottom: 100px;
        @media (max-width: 450px){
            margin-bottom: 40px;
        }
    }
    &__card{
        margin-top: 20px;
        padding: 51px 46px;
        border-radius: 22px;
        display: flex;
        justify-content: space-between;
        p {
            color: rgb(140, 139, 142);
        }
      span {
        background: #252136;
        border-radius: 50px;
        font-size: 15px;
        font-weight: 400;
        color: rgb(140, 139, 142);
        padding: 3px 17px;
        max-height: 29px;
        min-width: 73px;
      }
        @media (max-width: 450px) {
            padding: 30px 15px;
            h2 {
                font-size: 20xp;
                line-height: 30px;
            }
        }
    }
}

.q-card.profile-page__card{
  border-radius: 22px;
}
</style>