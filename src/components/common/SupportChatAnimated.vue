<script setup>
import { onMounted, onUnmounted, ref } from "vue";

    const wrapperRef = ref(null)

    const isStartAnimate = ref(false)
    const stepAnimate = ref(0)
    const timeOuts = ref([])

    const startAnimateChat = () => {
        isStartAnimate.value = true

        wrapperRef.value.childNodes.forEach((item, index) => {

           const timeOut = setTimeout(() => {
               item.classList.add('chat-sms--visible')
               stepAnimate.value++
            }, 1200 * index)

            timeOuts.value.push(timeOut)
        })
    }

    const endAnimateChat = () => {
        if(stepAnimate.value !== 0){
            timeOuts.value.forEach(clearTimeout)

            isStartAnimate.value = false
            stepAnimate.value = 0

            wrapperRef.value.childNodes.forEach((item) => {
                item.classList.remove('chat-sms--visible')
            })
        }
    }

    const onIntersection = (entry) => {
        if(entry.isIntersecting && !isStartAnimate.value){
            startAnimateChat()
        }else {
            endAnimateChat()
        }
    }

    onMounted(() => {
        wrapperRef.value.childNodes.forEach((item) => {
            item.classList.remove('chat-sms--visible')
        })
    })

    onUnmounted(() => {
        timeOuts.value.forEach(clearTimeout)
    })
</script>

<template>
  <div
    ref="wrapperRef"
    v-intersection="onIntersection"
    class="support-chat-animated__wrapper"
  >
    <div class="support-chat-animated__user-sms chat-sms">
      <p>Как отслеживать статистику, сколько лидов пришло от меня?</p>
    </div>
    <div class="support-chat-animated__support-sms chat-sms">
      <p>Вся статистика в личном кабинете, от переходов на сайт до ваших заработанных денег.</p>
    </div>
    <div class="support-chat-animated__user-sms chat-sms">
      <p>Оплачиваете ли расходы на первые заливы?</p>
    </div>
    <div class="support-chat-animated__support-sms chat-sms">
      <p>Нет, арбитражник сам оплачивает свои расходы, с первого дня залива.</p>
    </div>
    <div class="support-chat-animated__user-sms chat-sms">
      <p>Проблема с регистрацией, что делать?</p>
    </div>
    <div class="support-chat-animated__support-sms chat-sms">
      <p>Вы можете обратиться в support, обязательно помогут.</p>
    </div>
  </div>
</template>

<style lang="scss">
    .support-chat-animated{
        &__wrapper{
            background: white;
            max-width: 490px;
            width: 100%;
            height: 404px;
            flex: 0 0 300px;
            border-radius: 22px;
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
            gap: 9px 0px;
            overflow: hidden;

            p {
                margin-bottom: 0;
            }

            > div{
                padding: 10px 10px;
                max-width: 370px;
                width: 100%;
                display: flex;
            }

            .chat-sms{
                transform: translateY(50px);
                opacity: 0;
                transition: 0.3s;
            }
            .chat-sms--visible{
                transition: 0.5s;
                opacity: 1;
                transform: translateY(0px);
            }
        }

        &__user-sms{
            background: #f2f4f5;
            color: #000;
            border-radius: 0 10px 10px 10px;
        }
        &__support-sms{
            background: #4058DD;
            border-radius: 10px 10px 0 10px;
            color: white;
            margin-left: auto;
        }

        @media (max-width: 403px) {
            &__wrapper{
                height: 440px;
            }
        }
        @media (max-width: 338px) {
            &__wrapper{
                height: 480px;
            }
        }
    }
</style>