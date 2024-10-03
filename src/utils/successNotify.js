import { Notify } from "quasar";

export function successNotify (message = null) {
    const messageText = typeof message ==='string' ? message : "Выполнено успешно"
    Notify.create({
        type: "positive",
        message: messageText
    });
}