<script setup>
import { watch, ref, reactive, inject } from "vue";
import { fullscreenSpinner } from "@/utils/fullscreenSpinner.js";
import { errorNotify } from "@/utils/errorNotify.js";

const props = defineProps({
    detailsId: {
        type: [Number, null],
        default: null,
    },
    partnerType: {
        type: [String, null],
        default: null,
    },
    commentText: {
        type: [String, null],
        default: null,
        required: false,
    },
});

const emit = defineEmits(["hide-dialog"]);

const spinner = fullscreenSpinner();
const $http = inject("$http");

const ndsIdOptions = new Map([
    [1, "Без НДС"],
    [2, "10%"],
    [3, "20%"],
]);

const isShowPreviewDialog = defineModel();

const initialPartnerDetails = {
    user_id: props.userId,
    form_id: null,
    id: null,
    fio: null,
    snils: null,
    inn: null,
    kpp: null,
    ogrn: null,
    name: null,
    short_name: null,
    registration_address: null,
    address: null,
    legal_address: null,
    nds_id: null,
    rs: null,
    ks: null,
    bik: null,
    bank: null,
    dr: null,
    usdt: null,
};

const partnerDetails = reactive({ ...initialPartnerDetails });
const formDialogRef = ref(null);

watch(() => props.detailsId, async (newId) => {
    if (newId && isShowPreviewDialog.value) {
        await fetchPartnerDetails(props.detailsId);
    }
});

const hideFormDialog = () => {
    formDialogRef.value.hide();
};

const fetchPartnerDetails = async (id) => {
    spinner.show();
    const { error, data, success } = await $http.getPartnerDetailsItem({ id: id });
    if (error) {
        errorNotify(typeof error === "string" ? error : "Ошибка получения данных");
        console.log(error);
    }
    spinner.hide();

    if (success) {
        Object.assign(partnerDetails, data);
    }
};

const onHideDialog = () => {
    Object.assign(partnerDetails, initialPartnerDetails);
    emit("hide-dialog");
};

</script>

<template>
  <q-dialog
    ref="formDialogRef"
    v-model="isShowPreviewDialog"
    transition-show="rotate"
    transition-hide="rotate"
    class="partner-details-preview"
    @hide="onHideDialog"
  >
    <q-card class="partner-details-preview__container bg-purple-10 column no-wrap">
      <q-card-section class="partner-details-preview__header">
        <h2>
          {{ partnerDetails.fio || partnerDetails.name }}
          <p class="type-partner">
            {{ partnerType }}
          </p>
        </h2>
        <div>
          <q-btn
            class="q-py-xs bg-purple-12 close-btn"
            round
            size="10px"
            @click="hideFormDialog"
          >
            <q-icon
              name="icon-pm-cross"
              size="14px"
            />
          </q-btn>
        </div>
      </q-card-section>
      <q-scroll-area
        class="partner-details-preview__contnent"
        style="height: 100%;"
      >
        <q-card-section class="partner-details-preview__section">
          <div class="wrapper-column">
            <div>
              <p>ИНН</p>
              <p>{{ partnerDetails.inn || "-" }}</p>
            </div>
            <div v-if="partnerDetails.ogrn">
              <p>ОГРН/ОГРНИН</p>
              <p>{{ partnerDetails.ogrn }}</p>
            </div>
            <div>
              <p>Дата рождения</p>
              <p>{{ partnerDetails.dr || "-" }}</p>
            </div>
            <div v-if="partnerDetails.legal_address">
              <p>Юридический адрес</p>
              <p>{{ partnerDetails.legal_address }}</p>
            </div>
          </div>
          <a href="#">Скачать оферту</a>
        </q-card-section>
        <q-card-section class="partner-details-preview__section">
          <div class="partner-details-preview__section-title">
            <h2>Дополнительная информация</h2>
          </div>
          <div class="partner-details-preview__section-content">
            <div
              v-if="partnerDetails.short_name"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Сокращенное наименование
              </div>
              <div class="row">
                {{ partnerDetails.short_name }}
              </div>
            </div>
            <div
              v-if="partnerDetails.registration_address"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Адрес регистрации
              </div>
              <div class="row">
                {{ partnerDetails.registration_address }}
              </div>
            </div>
            <div
              v-if="partnerDetails.address"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Почтовый адрес
              </div>
              <div class="row">
                {{ partnerDetails.address }}
              </div>
            </div>
            <div
              v-if="partnerDetails.nds_id"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Ставка НДС
              </div>
              <div class="row">
                {{ ndsIdOptions.get(partnerDetails.nds_id) }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="partner-details-preview__section">
          <div class="partner-details-preview__section-title">
            <h2>Платежные реквизиты</h2>
          </div>
          <div class="partner-details-preview__section-content">
            <div
              v-if="partnerDetails.rs"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Расчетный счёт
              </div>
              <div class="row">
                {{ partnerDetails.rs }}
              </div>
            </div>
            <div
              v-if="partnerDetails.ks"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Корреспондентский счёт
              </div>
              <div class="row">
                {{ partnerDetails.ks }}
              </div>
            </div>
            <div
              v-if="partnerDetails.bik"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                БИК
              </div>
              <div class="row">
                {{ partnerDetails.bik }}
              </div>
            </div>
            <div
              v-if="partnerDetails.bank"
              class="partner-details-preview__row-item"
            >
              <div class="row">
                Банк
              </div>
              <div class="row">
                {{ partnerDetails.bank }}
              </div>
            </div>
            <div class="partner-details-preview__row-item">
              <div class="row">
                Тип платежа
              </div>
              <div class="row">
                Банковский перевод
              </div>
            </div>
            <div class="partner-details-preview__row-item">
              <div class="row">
                Валюта
              </div>
              <div class="row">
                Российский рубль
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="partner-details-preview__section column">
          <div class="partner-details-preview__section-title">
            <h2>USDT</h2>
          </div>
          <div class="partner-details-preview__section-content">
            <div class="partner-details-preview__row-item">
              <div>USDT</div>
              <div>{{ partnerDetails.usdt }}</div>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="commentText"
          class="partner-details-preview__section comment"
        >
          <h3>Комментарий пользователя:</h3>
          <p>
            {{ commentText }}
          </p>
        </q-card-section>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>


<style lang="scss">

.q-dialog__inner--minimized > .partner-details-preview__container {
    width: 100%;
    max-width: 1125px;
}

.partner-details-preview {
    &__container {
        padding: 22px;
        display: flex;
        height: 90vh;
        flex-direction: column;
        max-width: 1000px;
        width: 100%;
    }

    &__header {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__section-title {
        margin-bottom: 24px;
    }

    &__section:nth-child(1) {
        .wrapper-column {
            gap: 20px 40px;
            display: flex;
            margin-bottom: 24px;

            p {
                font-size: 13px;
                font-weight: 400;
                line-height: 15px;
                text-align: left;
            }

            p:first-child {
                color: rgb(140, 139, 142);
                margin-bottom: 5px;
            }

            p:last-child {
                color: rgb(255, 255, 255);
                margin-bottom: 0;
            }
        }

        a {
            color: #F90042;
        }
    }

    &__section:nth-child(5),
    &__section:nth-child(4),
    &__section:nth-child(3),
    &__section:nth-child(2) {
        padding-top: 30px;
        border-top: 1px solid rgb(16, 14, 25);
    }

    &__section:nth-child(5) {
        p {
            margin-top: 10px;
        }
    }

    &__row-item {
        display: flex;
        max-width: 450px;
        justify-content: space-between;

        div:first-child {
            color: rgb(140, 139, 142);
        }

        .row {
            margin-bottom: 24px;
        }
    }

    .type-partner {
        margin-top: 16px;
        margin-bottom: 0;
        font-weight: 400;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 18px;
        }

        .wrapper-column {
            flex-direction: column;
        }

        &__row-item {
            display: block;

            .row {
                margin-bottom: 7px;
            }
        }
    }
}
</style>
