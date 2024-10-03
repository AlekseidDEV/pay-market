import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const guestKey = 'YdZ2j_jk67c1SSWaMp_Jb56qJhYg0XLv'

export function regNewUser(user) {

    const nameSeparator = user.username.split(' ')

    return axiosClient.post(`api/user/register`, {
        f: nameSeparator[0],
        i: nameSeparator[1],
        o: nameSeparator[2],
        username: user.login.replace(/\W/gi, ''),
        password: user.password,
        auth_key: guestKey
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

export function loginUser(data) {
    return axiosClient.post(`api/user/login`, {
        username: data.phone.replace(/\W/gi, ''),
        password: data.password,
        auth_key: guestKey
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

export function userIssset(name){
    return axiosClient.get(`api/user/isset&auth=:${guestKey}&username=${name.replace(/\W/g, '')}`)
}