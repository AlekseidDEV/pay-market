import { createApp } from "vue";
import { createPinia } from "pinia";
import { Notify, Quasar, Dialog, Loading, Cookies } from "quasar";

import router from "@/core/router/index.js";
import apiPlugin from "@/core/api/api.plugin";
import { getUser, authPlugin } from "@/core/api/auth.plugin";
import { useMainStore } from "./core/stores";

import App from "@/App.vue";

import "quasar/src/css/flex-addon.sass";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "@/assets/style.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

(async function () {
    const userCookies = {
        username: Cookies.get("username"),
        auth_key: Cookies.get("auth_key"),
    };

    const store = useMainStore();

    if (userCookies.username && userCookies.auth_key) {
        const { data, success } = await getUser(userCookies.username, userCookies.auth_key);
        if (success) {
            store.setUser(data);
        }
    }

    app.use(apiPlugin, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    })
        .use(authPlugin)
        .use(router)
        .use(Quasar, {
            screen: {
                bodyClasses: true,
            },
            plugins: {
                Notify,
                Dialog,
                Loading,
                Cookies,
            },
        })
        
    app.mount("#app");
})();
