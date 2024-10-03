import { Notify } from "quasar";

export function errorNotify(message = null) {  
    const messageText = typeof message ==='string' ? message : "Произошла неизвестная ошибка, повторите попытку позже"
    Notify.create({
        type: "negative",
        message: messageText
    });
}
