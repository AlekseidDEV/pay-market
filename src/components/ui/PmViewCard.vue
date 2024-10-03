<script setup>
    defineProps({
        icon: {
            type: Object,
            required: false,
            default: () => {}
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        text: {
            type: String,
            required: false,
            default: ''
        },
        bgCard: {
            type: String,
            required: false,
            default: ''
        }
    })
</script>

<template>
  <div class="pm-view-cart__wrapper">
    <div>
      <q-card
        :style="bgCard ? `background: url(${bgCard}) no-repeat center/cover;` : ''"
      >
        <span
          v-if="icon"
          :style="`background: ${icon.color}`"
        >
          <q-icon
            :name="icon.name"
            color="white"
            :size="icon.size"
          />
        </span>
        <h3
          v-if="title"
          v-html="title"
        />
        <p v-html="text" />
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
    .pm-view-cart{
        &__wrapper{
            height: 100%;
            > div {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .q-card {
                width: 100%;
                height: 100%;
                border-radius: 22px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 15px;

                h3 {
                    margin-bottom: 20px;
                }

                span {
                    padding: 15px;
                    border-radius: 50px;
                    margin-bottom: 25px;
                }
            }
        }
    }
</style>