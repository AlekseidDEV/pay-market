<script setup>



import { successNotify } from "@/utils/successNotify.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { computed } from "vue";

const props = defineProps({
    linkSource: {
        type: String,
        required: true,
        default: ''
    }
})

const copyText = computed(() => {
    return props.linkSource
})

const copyClipboard = () => {
    navigator.clipboard.writeText(copyText.value).then(() => {
        successNotify("Ссылка скопирована");
    }).catch(() => {
        errorNotify();
    });
};
</script>

<template>
  <q-icon
    name="icon-pm-copy"
    size="17px"
    class="copy-uid-link"
    @click="copyClipboard"
  />
<!--  <div>-->
<!--    <span>Скопируйте ссыл ку</span>-->
<!--    <input-field-->
<!--      ref="inputCopyLink"-->
<!--      v-model="copyText"-->
<!--      class="traffic-source__field-copy"-->
<!--      :readonly="true"-->
<!--    >-->
<!--      <template #append-slot>-->
<!--        <DefaultBtn-->
<!--          v-if="!Screen.lt.md"-->
<!--          class="traffic-source__copy-btn"-->
<!--          @click="copyClipboard"-->
<!--        >-->
<!--          <template #default>-->
<!--            Скопировать-->
<!--          </template>-->
<!--        </DefaultBtn>-->
<!--        <DefaultBtn-->
<!--          v-else-->
<!--          bg-color="pink"-->
<!--          class="traffic-source__copy-btn&#45;&#45;mobile"-->
<!--          :border="false"-->
<!--        >-->
<!--          <i class="icon-pm-copy" />-->
<!--        </DefaultBtn>-->
<!--      </template>-->
<!--    </input-field>-->
<!--  </div>-->
</template>

<style lang="scss">
  .q-icon.copy-uid-link{
    cursor: pointer;
    margin-left: 10px;
  }
</style>