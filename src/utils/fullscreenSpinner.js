import { Loading, QSpinnerGears } from "quasar";

export const fullscreenSpinner = () => {
    Loading.setDefaults({
        message: "Пожалуйста, подождите",
        messageColor: "red-13",        
        spinner: QSpinnerGears,
        spinnerColor: "red-13",
    });
    return Loading;
};
