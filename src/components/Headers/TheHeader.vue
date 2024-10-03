<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Screen } from 'quasar';
import { useMainStore } from '@/core/stores';
import { routesAccessMap } from '@/core/router/accessMap.js';

const store = useMainStore()
const topMenuRoute = ref('')
const topRightMenuRoute = ref('')
const topMenuRoutes = ref([])
const topRightMenuRoutes = ref([])
const compactMenuRoutes = ref([])

const isShowMenu = ref(false)
const compactBreakPoint = 880

const imgPath = computed(() => {
  return Screen.lt.md ? '/icons/logoMobile.svg' : '/icons/logo.svg'
})

const isCompactView = computed(() => {
  return Screen.width < compactBreakPoint
})

const userRole = computed(() => {
  return store.userRole
})

const isLoggedIn = computed(() => {
  return store.isLoggedIn
})

watch(
  () => store.userRole,
  () => {
    updateRoutes()
  },
)

const updateRoutes = () => {

  const role = userRole.value

  topMenuRoutes.value = []
  topRightMenuRoutes.value = []
  compactMenuRoutes.value = []

  routesAccessMap.forEach((route, name) => {
    if (route?.hasAccess?.includes(role)) {
      if (route?.uses.has('top-menu') && route.menuLabel) {
        topMenuRoutes.value.push({
          name,
          label: route.menuLabel,
          to: { name }
        },
        )
      }

      if (route?.uses?.has('top-right-menu')) {
        topRightMenuRoutes.value.push({
          name,
          label: route.menuLabel,
          to: { name }
        },
        )
      }

      if (route?.uses?.has('compact-menu') && route.menuLabel) {
        compactMenuRoutes.value.push({
          name,
          label: route.menuLabel,
          to: { name }
        },
        )
      }
    }
  });
}

const logoutUser = () => {
    if(isLoggedIn.value){
        store.logoutUser()
    }
}

onMounted(() => {
  updateRoutes()
})

</script>

<template>
  <q-header class="the-header__wrapper">
    <div
      class="layout-container full-height row no-wrap justify-between items-stretch"
    >
      <div class="the-header__logo q-pl-sm row items-center">
        <router-link :to="{name: 'main-page'}">
          <img
            :src="imgPath"
            alt="logo"
          >
        </router-link>
      </div>
      <div class="the-header__menu col-grow">
        <q-tabs
          v-if="!isCompactView"
          v-model="topMenuRoute"
          breakpoint="0"
          align="left"
          indicator-color="red-13"
          :stretch="true"
          content-class="the-header__menu-content"
        >
          <q-route-tab
            v-for="(item) in topMenuRoutes"
            :key="`key_${item.name}`"
            class="router-tab-test"
            :name="item.name"
            :label="item.label"
            :no-caps="true"
            :to="item.to"
            exact
          />
        </q-tabs>
      </div>
      <div class="the-header__profile">
        <q-tabs
          v-if="!isCompactView"
          v-model="topRightMenuRoute"
          indicator-color="red-13"
          content-class="the-header__profile-content"
        >
          <q-route-tab
            v-for="(item) in topRightMenuRoutes"
            :key="`key_${item.name}`"
            class="router-tab-test"
            :name="item.name"
            :label="item.label"
            :no-caps="true"
            :to="item.to"
            exact
          />
          <q-route-tab
            v-if="!isCompactView"
            name="exit"
            :no-caps="true"
            :to="{ name: isLoggedIn ? 'main-page' : 'auth-user-page' }"
            exact
            @click="logoutUser"
          >
            <div class="row items-center">
              <div class="q-pr-md">
                {{ isLoggedIn ? 'Выход' : 'Войти' }}
              </div>
              <q-icon
                :name="isLoggedIn ? 'icon-pm-logout' : 'icon-pm-login'"
                size="18px"
              />
            </div>
          </q-route-tab>
        </q-tabs>
      </div>
      <div
        v-if="isCompactView"
        class="the-header__collapsed-menu q-pr-md row items-center"
      >
        <q-btn
          dense
          flat
          no-wrap
          aria-label="Menu"
          icon="icon-pm-burger"
          @click="isShowMenu = !isShowMenu"
        />
      </div>      
    </div>
  </q-header>
  <q-drawer
    v-model="isShowMenu"
    :breakpoint="880"
    side="right"
    elevated
    class="the-header__drawer-wrapper"
  >
    <q-list>
      <q-item>
        <q-item-section class="row no-wrap content-start">
          <div class="q-pt-md row no-wrap justify-between">
            <router-link :to="{name: 'main-page'}">
              <img
                src="/icons/logo.svg"
                alt="logo"
                height="50px"
              >
            </router-link>
            <q-btn @click="isShowMenu = false">
              <q-icon
                name="icon-pm-cross"
                size="16px"
              />
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-item
        v-for="(item) in compactMenuRoutes"
        :key="`key_${item.name}`"
        clickable
        exact
        :to="item.to"
        exact-active-class="text-red-13"
        @click="isShowMenu = false"
      >
        <q-item-section>
          {{ item.label }}
        </q-item-section>
      </q-item>
      <q-item        
        :to="{ name: isLoggedIn ? 'logout-page' : 'auth-user-page' }"
        exact
        exact-active-class="text-red-13"
        @click="isShowMenu = false"
      >
        <q-item-section>
          <div class="row">
            <div class="q-pr-md">
              {{ isLoggedIn ? 'Выход' : 'Войти' }}
            </div>
            <q-icon
              :name="isLoggedIn ? 'icon-pm-logout' : 'icon-pm-login'"
              size="24px"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<style lang="scss" scoped>
.q-tabs {
  height: 100%;
}

.the-header__wrapper {
  background-color: #1E1B2E;
  height: 74px;

  .the-header__logo {
    padding-right: 40px;
    padding-top: 15px;

    img {
      height: 40px;
    }
  }

  .the-header__menu {
    max-width: 1130px;
  }

  .the-header__profile {
    padding-left: 40px;
  }

}
</style>

<style lang="scss">
.the-header__menu-content {
  gap: 38px;
}

.the-header__drawer-wrapper {
  background-color: #1E1B2E;
}
</style>
