import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getUser =  async (username, auth_key) => {
    const { error, data, success } = await axiosClient
        .get(`api/user/get-user-by-access`, {
            params: {
                auth: `${username}:${auth_key}`,
                username,
                auth_key,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            const { data } = response;
            return {
                error: data.error || undefined,
                data: data,
                success: data.status,
            };
        })
        .catch((error) => {
            return {
                error: error.message || undefined,
                data: undefined,
                success: false,
            };
        });
    return { error, data, success };
}

export const requestRegister = async (phone) => {
    const phoneFormat = phone.replace(/\W/g, '')

    const {key, isNewUser, status, error} = await axiosClient
        .get('api/user/request-register', {
            params: {
                username: phoneFormat
            },
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then((response) => {
            const { data } = response

            return {
                key: data.key,
                isNewUser: data.status,
                status: response.status,
                error: undefined
            };
        })
        .catch((error) => {
            return {
                key: undefined,
                isNewUser: undefined,
                status: error.response.status,
                error: error.message || undefined
            }
        });

    return {key, isNewUser, status, error}
}

export const requestResetpassword = async (phone) => {
    const phoneFormat = phone.replace(/\W/gi, '')

    const  {key, status, isUser, error} = await axiosClient
        .post(`api/user/request-reset-password`, {
            username: phoneFormat
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {
            return {
                key: response.data.token,
                status: response.status,
                isUser: response.data.status,
                error: undefined
            }
        })
        .catch((error) => {
            return {
                key: undefined,
                status: error.status,
                isUser: false,
                error: error.message || undefined
            }
        })

    return {key, status, isUser, error}
}

export const resetPassword = async (phone, token, password) => {
    const phoneFormat = phone.replace(/\W/gi, '')
    const {isReset, error} = await axiosClient
        .post('api/user/reset-password', {
            username: phoneFormat,
            token: token,
            password: password
        },
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then((response) => {
            return {
                isReset: response.data.status,
                error: response.data.error
            }
        })
        .catch((error) => {
            return {
                isReset: undefined,
                error: error.message || undefined
            }
        })

    return {isReset, error}
}

export const authPlugin = {

    install: (Vue) => {
        const guestKey = "YdZ2j_jk67c1SSWaMp_Jb56qJhYg0XLv";        

        Vue.config.globalProperties.$auth = {
            regNewUser: (user, key) => {
                const nameSeparator = user.login.split(" ");
                const phoneFormat = user.username.replace(/\W/gi, '')

                return axiosClient.post(
                    `api/user/register`,
                    {
                        f: nameSeparator[0],
                        i: nameSeparator[1],
                        o: nameSeparator[2],
                        username: phoneFormat,
                        password: user.password,
                        auth_key: guestKey,
                        key: key
                    },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            },

            loginUser: async (requestData) => {
                const { error, data, success } = await axiosClient
                    .post(
                        `api/user/login`,
                        {
                            username: requestData.phone.replace(/\W/gi, ""),
                            password: requestData.password,
                            auth_key: guestKey,
                        },
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    )
                    .then((response) => {
                        const { data } = response;
                        return {
                            error: data.error || undefined,
                            data: data.user,
                            success: data.status,
                        };
                    })
                    .catch((error) => {
                        return {
                            error: error.message || undefined,
                            data: undefined,
                            success: false,
                        };
                    });
                return { error, data, success };
            },

            getUser,

            requestResetpassword,

            resetPassword,

            requestRegister,

            userIssset: (name) => {
                return axiosClient.get(`api/user/isset&auth=:${guestKey}&username=${name.replace(/\W/g, "")}`);
            },
        };

        Vue.provide("$auth", Vue.config.globalProperties.$auth);
    },
};
