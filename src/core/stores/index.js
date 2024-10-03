import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Cookies } from "quasar";

const guestUser = {
    username: "guest",
    auth_key: "YdZ2j_jk67c1SSWaMp_Jb56qJhYg0XLv",
    //
    //role не пишем, если юзер не залогинен
    //
};

export const useMainStore = defineStore("mainStore", () => {
    //state
    let user = ref({
        ...guestUser
    });

    // actions
    const setUser = (userData) => {
        Object.assign(user.value, userData)

        Cookies.set("username", user.value.username, { expires: "1h" });
        Cookies.set("auth_key", user.value.auth_key, { expires: "1h" });
    };
    const logoutUser = () => {
        user.value = {
            ...guestUser
        }
        Cookies.remove("username");
        Cookies.remove("auth_key");
    }

    // getters
    const isLoggedIn = computed(() => user.value?.role?.item_name ? true : false );
    const getUser = computed(() => user.value);
    const userRole = computed(() => user.value?.role?.item_name || 'guest');

    return {
        user,
        userRole,
        isLoggedIn,
        getUser,
        setUser,
        logoutUser,
    };
});
