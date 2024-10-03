import axios from "axios";

export const getConfirmCode = async (phone, code) => {
    const phoneFormat = phone.replace(/\W/gi, '')

    const { success, error } = await axios.post(
        `https://smsc.ru/sys/send.php?login=ross-ik@yandex.ru&psw=Ahsdfku76234`,{
            phones: phoneFormat,
            mes: `Ваш проверочный код: ${code}`,
        }
    )
        .then(() => {
            return {
                error: undefined,
                success: true
            }
        })
        .catch((error) => {
            return {
                error: error.message || undefined,
                success: false
            }
        })

    return {success, error}
}




