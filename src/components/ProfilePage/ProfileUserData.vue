<script setup>
import InputField from "@/components/ui/InputField.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { useMainStore } from "@/core/stores/index.js";
import { partnerDetails, validateByRegExp } from "@/utils/validateUtils.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";
import { inject, reactive, ref, watch } from "vue";

const store = useMainStore()
const user = store.getUser
const $http = inject('$http')

const inputRef = ref(null)
const isDisableBtn = ref(true)

const inputsData = reactive({
    fullName: {id : 0, label: 'Фамилия Имя Отчество', readonly: true, value: user?.profile?.f + ' ' + user?.profile?.i+ ' ' + user?.profile?.o, rule: [(val) => validateByRegExp(val, partnerDetails.fullName)], mes: 'Укажите фамилию, имя и отчество через пробел'},
    phone: {id : 1, label: 'Номер телефона', readonly: true, value: user.username, rule: [(val) => val.length === 11 || val.length === 17], mes: 'Неверно введе номер телефона'},
    tg: {id : 2, label: 'Telegram', readonly: true, value: user.profile.tg, rule: [], mes: ''},
    password: {id : 3, label: 'Новый пароль', readonly: true, value: '', rule: [(val) => validateByRegExp(val, /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)], mes: 'Пароль должен быть не менее 8 символов, и содержать хотя бы одну заглавную букву, цифру, спецсимвол'}
})

watch([
    () => inputsData['fullName'].value,
    () => inputsData['phone'].value,
    () => inputsData['tg'].value,
    () => inputsData['password'].value,
], () => {
    if(isDisableBtn.value) isDisableBtn.value = false
})

const editField = (input) => {
    input.readonly = false
    inputRef.value[input.id].defaultInput.select()
}

const updateUserProfile = async (formData) => {
    const {error, data, status} = await $http.updateUser(formData)

    if(status){
        store.setUser(data)
        isDisableBtn.value = true
        for(let obj in inputsData){
            inputsData[obj].readonly = true
        }
        successNotify('Данные успешно изменены')
    }else {
        errorNotify()
        console.log('Error: ' + error);
    }
}

const saveChangesProfile = () => {
    const nameSeparator = inputsData['fullName'].value.split(' ')
    const formatPhone = inputsData['phone'].value.replace(/\W/g, '')

    const formData = {
        id: user.id,
        username: formatPhone,
        f: nameSeparator[0],
        i: nameSeparator[1],
        o: nameSeparator[2],
        tg: inputsData['tg'].value.replace(/[\s@]/g, '')
    }

    inputsData['password'].value ? formData['password'] = inputsData['password'].value : ''

    updateUserProfile(formData)
}

</script>

<template>
  <div>
    <q-form
      class="profile-user-data__form"
      @submit.prevent="saveChangesProfile"
    >
      <InputField
        v-for="(input) of inputsData"
        :key="input.label"
        ref="inputRef"
        v-model="input.value"
        :label="input.label"
        :mask="input.id === 1 ? '7 (###) ###-##-##' : ''"
        class="profile-user-data__input"
        :readonly="input.readonly"
        :rules="input.rule"
        :error-message="input.mes"
      >
        <template #append-slot>
          <DefaultBtn
            class="profile-user-data__edit-btn"
            bg-color="grey"
            :border="false"
            @click.prevent="editField(input)"
          >
            <q-icon
              name="icon-pm-edit"
              size="16px"
            />
          </DefaultBtn>
        </template>
      </InputField>
      <DefaultBtn
        :disable="isDisableBtn"
        class="profile-user-data__save-btn"
      >
        Сохранить
      </DefaultBtn>
    </q-form>
  </div>
</template>

<style lang="scss">
.profile-user-data{
    &__form{
        max-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px 0px;
        margin: auto;
        padding: 20px 10px;
    }
    &__input{
        max-width: 500px;
        width: 100%;
        height: 58px;
    }
    &__edit-btn{
        height: 38px;
        width: 38px;
    }
    &__save-btn{
        padding: 18px 60px;
        max-width: 260px;
        margin-top: 25px;
    }
}

.profile-user-data__input .q-field__bottom{
    padding-top: 13px;
}
</style>