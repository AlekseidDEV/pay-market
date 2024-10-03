<script setup>
  import InputField from "@/components/ui/InputField.vue";
  import DefaultBtn from "@/components/ui/DefaultBtn.vue";

  import {inject, ref} from "vue";
  import {errorNotify} from "@/utils/errorNotify.js";
  import {successNotify} from "@/utils/successNotify.js";

  const emits = defineEmits(['update-table'])

  const props = defineProps({
    nameTraffic: {
      type: String,
      default: ''
    },
    userId: {
      type: Number,
      default: 0
    },
    offerId: {
      type: String,
      default: '0'
    },
  })

  const $http = inject('$http')
  const nameSource = ref('')
  const priceCpl = ref('')
  const priceCpa = ref('')
  const formRef = ref(null)

  const addTrafficSource = async () => {
    const {error} = await $http.createTrafficSource({
      user_id: props.userId,
      offer_id: props.offerId,
      price_cpl: priceCpl.value,
      price_cpa: priceCpa.value,
      ...(nameSource.value ? {name: nameSource.value} : {name: props.nameTraffic})
    })

    if (error) {
      console.error('Error: ' + error);
      errorNotify()
      return
    }

    nameSource.value = ''
    priceCpa.value = ''
    priceCpl.value = ''

    formRef.value.reset()

    successNotify('Источник трафика добавлен')
    emits('update-table')
  }
</script>

<template>
  <q-form
    ref="formRef"
    @submit.prevent="addTrafficSource"
  >
    <div class="traffic-source__wrapper-field">
      <div v-if="nameTraffic === 'default'">
        <span>Название источника </span>
        <input-field
          v-model="nameSource"
          class="traffic-source__input-field"
          :rules="[(val) => !!val]"
          error-message="Обязательное поле"
        />
      </div>
      <div>
        <span>Цена за лид (CPL)</span>
        <input-field
          v-model="priceCpl"
          class="traffic-source__input-field"
          :rules="[(val) => !!val || !!priceCpa]"
          error-message="Заполните поле CPL или CPA"
        />
      </div>
    </div>
    <div class="traffic-source__wrapper-field">
      <div>
        <span>Цена за подписку (CPA)</span>
        <input-field
          v-model="priceCpa"
          class="traffic-source__input-field"
          :rules="[(val) => !!val || !!priceCpl]"
          error-message="Заполните поле CPA или CPL"
        />
      </div>
    </div>
    <div class="traffic-source__add-btn">
      <DefaultBtn
        bg-color="dark"
        :border="false"
      >
        <template #default>
          Добавить источник
        </template>
      </DefaultBtn>
    </div>
  </q-form>
</template>

<style lang="scss">

</style>