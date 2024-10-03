<script setup>
import UserRequestForm from "@/components/common/UserRequestForm.vue";

import { inject, ref } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";

const $http = inject('$http')

const userName = ref('')
const userTg = ref('')
const userLink = ref('')
const userComment = ref('')
const isCheckPolicy = ref(false)

const sendForm = async () => {
    const formatedTg = userTg.value.replace(/[\s@]/gi, "");

    if(!isCheckPolicy.value){
        errorNotify("Для завершения, примите условия пользовательского соглашения.");
        return
    }

    const {error} = await $http.sendHighRiskPageForm({
        name: userName.value,
        link: userLink,
        tg: formatedTg,
        comment: userComment.value || '-'
    })

    if (error) {
        errorNotify("Ошибка отправки формы");
        return;
    }

    userName.value = "";
    userLink.value = "";
    userTg.value = "";
    userComment.value = "";
    isCheckPolicy.value = false

    successNotify("Форма отправлена");
}
</script>

<template>
  <UserRequestForm
    v-model:name="userName"
    v-model:telegram="userTg"
    v-model:link="userLink"
    v-model:comment="userComment"
    v-model:checkbox="isCheckPolicy"
    title-form="Хочу принимать платежи"
    @submit.prevent="sendForm"
  />
</template>

<style lang="scss">

</style>