<script setup>
  import {ref} from "vue";
  const emits = defineEmits(['changePolicy'])
  const valueCheckbox = ref(true)
</script>

<template>
  <div class="check">
    <div class="check_box">
      <label class="label">
        <input
          v-model="valueCheckbox"
          type="checkbox"
          class="checkbox"
          @change="emits('changePolicy')"
        >
        <span class="fake" />
      </label>
    </div>
    <p>Я согласен с <span>Правилами</span> и <span>Условиями передачи информации</span></p>
  </div>
</template>

<style scoped lang="scss">
.check {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

p {
  margin: 0;
  margin-left: 12px;
  text-align: left;
}

span {
  color: rgb(249, 0, 66);
  cursor: pointer;
}

.check_box {
  height: 20px;
}

input{
  display: none;
}

.fake {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #F3F4F7;
  border-radius: 5px;
}

.fake::before {
  position: absolute;
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: url(/icons/checkboxTrue.svg) no-repeat center #F3F4F7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.1s;
}

.checkbox:checked + .fake::before {
  opacity: 1;
}
</style>