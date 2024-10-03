import { createRouter, createWebHistory } from "vue-router";

import TheAuthLayout from "@/layouts/TheAuthLayout.vue";
import AuthUserPage from "@/pages/AuthUserPage.vue";
import StyleGuidePage from "@/pages/StyleGuidePage.vue";
import TheDefaultLayout from "@/layouts/TheDefaultLayout.vue";
import SettingsPage from "@/pages/admin/SettingsPage.vue";
import HomePage from "@/pages/user/HomePage.vue";
import FinancePage from "@/pages/user/FinancePage.vue";
import StatisticsPage from "@/pages/user/StatisticsPage.vue";
import ProfilePage from "@/pages/user/ProfilePage.vue";
import ExtendedStatisticsPage from "@/pages/user/ExtendedStatisticsPage.vue";
import OffersPage from "@/pages/user/OffersPage.vue";
import MainPage from "@/pages/MainPage.vue";
import OfferDetailPage from "@/pages/user/OfferDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import NoAccessPage from "@/pages/NoAccessPage.vue";
import LogoutPage from "@/pages/LogoutPage.vue";
import AdminHomePage from "@/pages/admin/AdminHomePage.vue";
import AdminPayoutPage from "@/pages/admin/AdminPayoutPage.vue";
import AdminOfferTogglePage from "@/pages/admin/AdminOfferTogglePage.vue";
import TheMainLayout from "@/layouts/TheMainLayout.vue";
import AdvertiserPage from "@/pages/main/AdvertiserPage.vue";
import VacancyPage from "@/pages/main/VacancyPage.vue";

import { routesAccessMap } from "@/core/router/accessMap.js";
import { useMainStore } from "@/core/stores/index.js";
import SpOffersPage from "@/pages/main/SpOffersPage.vue";
import HighRiskProjectPage from "@/pages/main/HighRiskProjectPage.vue";

export const userRoles = ["guest", "user", "admin", "boss"];

export const routesUses = new Set(["top-menu", "compact-menu", "top-right-menu", "other"]);

const routes = [
    {
        path: "/",
        component: TheMainLayout,
        children: [
            {
                path: "",
                name: "main-page",
                component: MainPage,
            },
            {
                path: "/sp-offers",
                name: "sp-offers-page",
                component: SpOffersPage,
            },
            {
                path: "/high-risk-project",
                name: "high-risk-page",
                component: HighRiskProjectPage,
            },
            {
                path: "/advertiser",
                name: "advertiser-page",
                component: AdvertiserPage,
            },
            {
                path: "/vacancies",
                name: "vacancies-page",
                component: VacancyPage,
            },
        ],
    },
    {
        path: "/user",
        beforeEnter: [checkAccess],
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "user-main",
                component: HomePage,
            },
            {
                path: "finance",
                name: "user-finance",
                component: FinancePage,
            },
            {
                path: "statistics",
                name: "user-statistics",
                component: StatisticsPage,
            },
            {
                path: "extended-statistics",
                name: "user-extended-statistics",
                component: ExtendedStatisticsPage,
            },
            {
                path: "offers",
                name: "user-offers",
                component: OffersPage,
            },
            {
                path: 'offers/:id',
                name: 'user-offer-detail',
                component: OfferDetailPage
            },
            {
                path: "profile",
                name: "user-profile",
                component: ProfilePage,
            },
        ],
    },
    {
        path: "/admin",
        name: "admin",
        beforeEnter: [checkAccess],
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "admin-main",
                component: AdminHomePage,
            },
            {
                path: "settings",
                name: "admin-settings",
                component: SettingsPage,
            },
            {
                path: "payout-approval",
                name: "admin-payout",
                component: AdminPayoutPage,
            },
            {
                path: "offer-management",
                name: "admin-offer-toggle",
                component: AdminOfferTogglePage,
            },
        ],
    },
    {
        path: "/auth",
        component: TheAuthLayout,
        children: [
            {
                path: "",
                name: "auth-user-page",
                component: AuthUserPage,
            },
        ],
    },
    {
        path: "/logout",
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "logout-page",
                component: LogoutPage,
            },
        ],
    },
    {
        path: "/style-guide",
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "style-guide-page",
                component: StyleGuidePage,
            },
        ],
    },
    {
        path: "/403",
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "403",
                component: NoAccessPage,
            },
        ],
    },
    {
        path: "/404",
        component: TheDefaultLayout,
        children: [
            {
                path: "",
                name: "404",
                component: NotFoundPage,
            },
        ],
    },
    {
        path: "/:catchAll(.*)",
        redirect: "404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition, ){
        if(savedPosition){
            return  savedPosition
        }else if(to.hash){
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 100
            }
        }else {
            return {top : 0}
        }
    }
});

function checkAccess(to, from, next) {
    const store = useMainStore();
    const role = store.userRole;
    const isLoggedIn = store.isLoggedIn;

    if (isLoggedIn) {
        const targetRouteData = routesAccessMap.get(to.name);
        if (targetRouteData?.hasAccess.includes(role)) {
            next();
        } else {
            next({ name: "403" });
        }
    } else next({ name: "403" });
}


router.beforeEach(() => {
    const store = useMainStore();
    console.warn("router store.userRole:", store.userRole);    
});

export default router;
