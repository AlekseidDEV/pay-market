import axios from "axios";

import { useMainStore } from "@/core/stores/index.js";

export default {
    install: (Vue, initOptions) => {
        const mainStore = useMainStore();

        const service = axios.create(initOptions);

        Vue.config.globalProperties.$axios = service;

        const api = async (options) => {
            return await service({
                ...options,
                params: {
                    auth: `${mainStore.getUser.username}:${mainStore.getUser.auth_key}`,
                    ...options.params,
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...options.headers,
                },
            })
                .then((response) => {
                    const { data, status } = response;
                    return { error: undefined, data, status };
                })
                .catch((error) => {
                    return { error, data: undefined, status: false };
                });
        };

        Vue.config.globalProperties.$http = {
            //common
            get: async (url, params, options) => await api({ ...options, ...{ method: "get", url, params } }),
            post: async (url, data, options) => await api({ ...options, ...{ method: "post", url, data } }),
            put: async (url, data, options) => await api({ ...options, ...{ method: "put", url, data } }),
            delete: async (url, data, options) => await api({ ...options, ...{ method: "delete", url, data } }),

            //
            //user-profile
            //
            updateUserPtofile: async (requestData) => {
                /**
                 * POST
                 * Обновляет профиль пользователя
                 * @param user_id int ID пользователя
                 * @param f string Фамилия
                 * @param i string Имя
                 * @param o string Отчество
                 * @param tg string Телеграм. Передавать БЕЗ @
                 * @param percent int Процент вознаграждения
                 * @return UserProfile|array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user/update-user-profile",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.profile || null,
                    success: data?.status || false,
                    status,
                };
            },

            //
            //countries
            //
            getCountryList: async () => {
                /**
                 * GET
                 * Возвращает список всех стран
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/country/get-list",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            createCountry: async (requestData) => {
                /**
                 * POST
                 * Добавляет в базу страну
                 * Возвращает объект страны или ошибку
                 * @param string name Полное название страны
                 * @param string shortName Краткое название страны
                 * @param string alpha2 Двухбуквенный код страны
                 * @param string alpha3 Трёхбуквенный код страны
                 * @param int iso ISO код страны
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/country/set-country",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.country || null,
                    success: data?.status || false,
                    status,
                };
            },

            updateCountry: async (requestData) => {
                /**
                 * POST
                 * Обновляет страну в базе. Обязателен только параметр ID
                 * Возвращает объект страны или ошибку
                 * @param int id ID страны в базе
                 * @param string name Полное название страны
                 * @param string shortName Краткое название страны
                 * @param string alpha2 Двухбуквенный код страны
                 * @param string alpha3 Трёхбуквенный код страны
                 * @param int iso ISO код страны
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/country/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.country || null,
                    success: data?.status || false,
                    status,
                };
            },

            deleteCountry: async (id) => {
                /**
                 * POST
                 * Удаляет страну из базы
                 * @param int id ID страны в базе
                 * @return array|true[]
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/country/delete",
                    data: { id },
                });
                return { error, data, status };
            },

            //
            //target-actions
            //
            getTargetActionList: async () => {
                /**
                 * GET
                 * Возвращает список всех елевых действий
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/target-action/get-list",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            createTargetAction: async (requestData) => {
                /**
                 * POST
                 * Добавляет в базу целевое действие
                 * Возвращает объект целевого действия или ошибку
                 * @param string name Полное название целевого действия
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/target-action/set-target-action",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.action || null,
                    success: data?.status || false,
                    status,
                };
            },

            updateTargetAction: async (requestData) => {
                /**
                 * POST
                 * Обновляет целевое действие в базе
                 * Возвращает объект целевого действия или ошибку
                 * @param int id ID целевого действия в базе
                 * @param string name название целевого действия
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/target-action/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.action || null,
                    success: data?.status || false,
                    status,
                };
            },

            deleteTargetAction: async (id) => {
                /**
                 * POST
                 * Удаляет целевое действие из базы
                 * @param int id ID целевого действия в базе
                 * @return array|true[]
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/target-action/delete",
                    data: { id },
                });
                return { error, data, status };
            },

            //
            //offers
            //
            getOfferList: async () => {
                /**
                 * GET
                 * Возвращает список всех офферов
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer/get-list",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.offers || null,
                    success: data?.status || false,
                    status,
                };
            },

            getOfferById: async (offerId) => {
                /**
                 * GET
                 * Возвращает оффер по ID
                 * @param int id  ID получаемого оффера
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer/get-by-id",
                    params: { id: offerId },
                })
                    .then((response) => {
                        return {
                            status: response.data.status,
                            data: response.data.offer,
                            error: undefined,
                        };
                    })
                    .catch((error) => {
                        return {
                            status: false,
                            data: undefined,
                            error: error.message || undefined,
                        };
                    });

                return { error, data, status };
            },

            createOffer: async (requestData) => {
                /**
                 * Добавляет офер в базу
                 * @param string name Название офера
                 * @param string logo Имя файла загруженного ранее
                 * @param string domine Домен офера без http(s) конечного слеша
                 * @param int country_id ID страны
                 * @param int target_action_id ID целевого действия
                 * @param int target_action_price Стоимость целевого действия
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer/set-offer",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.offer || null,
                    success: data?.status || false,
                    status,
                };
            },

            updateOffer: async (requestData) => {
                /**
                 * POST
                 * Обновляет офер в базе. Обязателен только параметр ID
                 * Возвращает объект офера или ошибку
                 * @param int id ID офера в базе
                 * @param string name Название страны
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.offer || null,
                    success: data?.status || false,
                    status,
                };
            },

            //
            //загрзука изображений
            //
            uploadPhoto: async (requestData) => {
                /**
                 * Принимает файл для загрузки на сервер. Возвращает путь до файла относительно папки uploads
                 * Файл должен лежать в поле image
                 * @param $dir string Название папки для сохранения. Папки создаются на сервере заранее
                 * @return array|string[]|void
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/file/upload-photo",
                    data: requestData,
                    params: {
                        dir: "logo",
                    },
                });
                return {
                    error: error || data?.error || null,
                    data: data?.name || null,
                    status,
                };
            },

            //
            //traffic-sources
            //
            getTrafficSourceById: async (id) => {
                /**
                 * GET
                 * Возвращает один источник по ID.
                 * @param int id ID источника в базе
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/traffic-source/get",
                    data: { id },
                });
                return {
                    error: error || data?.error || null,
                    data: data?.source || null,
                    success: data?.status || false,
                    status,
                };
            },

            createTrafficSource: async (requestData) => {
                /**
                 * POST
                 * Добавляет в базу источник трафика
                 * Возвращает объект источника или ошибку
                 * @param string name Название
                 * @param int user_id ID пользователя создавшего источние
                 * @param int offer_id ID офера к которому будет привязан источник
                 * @param float price_cpl Стоимость CPL
                 * @param float price_cpa Стоимость CPA
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/traffic-source/set",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.source || null,
                    success: data?.status || false,
                    status,
                };
            },

            updateTrafficSource: async (requestData) => {
                /**
                 * POST
                 * Обновляет источник трафика в базе. Обязателен только параметр ID
                 * Возвращает объект источника или ошибку
                 * @param int id ID источника в базе
                 * @param string name Название
                 * @param int user_id ID пользователя создавшего источние
                 * @param int offer_id ID офера к которому будет привязан источник
                 * @param float price_cpl Стоимость CPL
                 * @param float price_cpa Стоимость CPA
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/traffic-source/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.source || null,
                    success: data?.status || false,
                    status,
                };
            },

            deleteTrafficSource: async (id) => {
                /**
                 * POST
                 * Удаляет источник трафика из базы
                 * @param int id ID источника в базе
                 * @return array|true[]
                 * @throws \Throwable
                 * @throws \yii\db\StaleObjectException
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/traffic-source/delete",
                    data: { id },
                });
                return {
                    error: error || data?.error || null,
                    data: data || null,
                    success: data?.status || false,
                    status,
                };
            },

            getTrafficSourceList: async (params) => {
                /**
                 * GET
                 * Возвращает список всех источников по ID пользователя и ID офера.
                 * @param int $user_id ID пользователя в базе
                 * @param int $offer_id ID офера в базе
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/traffic-source/get-list",
                    params,
                });
                return {
                    error: error || data?.error || null,
                    data: data || null,
                    success: data?.status || false,
                    status,
                };
            },

            //
            //offer categories
            //
            getOfferCategoriesList: async () => {
                /**
                 * GET
                 * Возвращает список всех категорий
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer-category/get-list",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            createOfferCategory: async (requestData) => {
                /**
                 * POST
                 * Добавляет в базу категорию офера
                 * Возвращает объект категории или ошибку
                 * @param string name Название категории
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer-category/set-offer-category",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.category || null,
                    success: data?.status || false,
                    status,
                };
            },

            updateOfferCategory: async (requestData) => {
                /**
                 * * POST
                 * Обновляет категорию в базе. Обязателен только параметр ID
                 * Возвращает объект категории или ошибку
                 * @param int id ID категории в базе
                 * @param string name Название категории
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer-category/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.category || null,
                    success: data?.status || false,
                    status,
                };
            },

            deleteOfferCategory: async (requestData) => {
                /**
                 * POST
                 * Удаляет категорию из базы
                 * @param int id ID категории в базе
                 * @return array|true[]
                 * @throws \Throwable
                 * @throws \yii\db\StaleObjectException
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer-category/delete",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data || null,
                    //success: data?.status || false,
                    status,
                };
            },

            //
            //partner details
            //
            getNdsTypeList: async () => {
                /**
                 * * GET
                 * Возвращает список типов ндс
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/list/get-nds-type",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.nds || null,
                    success: data?.status || false,
                    status,
                };
            },

            getPartnerDetailsTypeList: async () => {
                /**
                 * * GET
                 * Возвращает список типов реквизитов
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/list/get-partner-forms",
                });
                return {
                    error: error || data?.error || null,
                    data: data?.partnerForms || null,
                    success: data?.status || false,
                    status,
                };
            },

            getPartnerDetailsList: async (params) => {
                /**
                 * GET
                 * Возвращает список всех реквизитов пользователя
                 * @param $user_id int ID пользоввателя
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/user-requisites/get-list",
                    params,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            getFilteredPartnerDetailsList: async (params) => {
                /**
                 * GET
                 * Возвращает список всех реквизитов пользователя
                 * @param $user_id int ID пользоввателя
                 * @return array
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/user-requisites/get-by-params",
                    params,
                });

                return {
                    error: error || data?.error || null,
                    data: data.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            getPartnerDetailsItem: async (params) => {
                /**
                 * GET
                 * * Возвращает реквизиты пользователя по ID
                 * @param $id int ID реквизитов
                 */
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/user-requisites/get",
                    params,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.list || null,
                    success: data?.status || false,
                    status,
                };
            },

            createPartnerDetails: async (requestData) => {
                /**
                 * POST
                 * Добавляет в базу реквизиты пользователя
                 * Возвращает объект реквизитов или ошибку
                 * @param user_id int ID пользователя
                 * @param form_id int ID типа реквизитов
                 * @param inn string ИНН
                 * @param kpp string КПП
                 * @param ogrn string ОГРН/ОГРНИП
                 * @param name string Полное наименование
                 * @param short_name string Сокращённое наименование
                 * @param address string Почтовый адрес
                 * @param legal_address string Юридический адрес
                 * @param nds_id int ID вида НДС
                 * @param rs string Расчетный счёт
                 * @param ks string Корреспондентский счёт
                 * @param bik string БИК
                 * @param bank string Банк
                 * @param dr string Дата рождения
                 * @param registration_address string Адрес регистрации
                 * @param fio string ФИО
                 * @param snils string СНИЛС
                 * @return array
                 * @throws \yii\db\Exception */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user-requisites/set",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.details || null,
                    success: data?.status || false,
                    status,
                };
            },

            updatePartnerDetails: async (requestData) => {
                /**
                 * POST
                 * Обновляет реквизиты в базе
                 * Возвращает объект реквизитов или ошибку
                 * @param int id ID реквизитов в базе
                 * @param user_id int ID пользователя
                 * @param form_id int ID типа реквизитов
                 * @param inn string ИНН
                 * @param kpp string КПП
                 * @param ogrn string ОГРН/ОГРНИП
                 * @param name string Полное наименование
                 * @param short_name string Сокращённое наименование
                 * @param address string Почтовый адрес
                 * @param legal_address string Юридический адрес
                 * @param nds_id int ID вида НДС
                 * @param rs string Расчетный счёт
                 * @param ks string Корреспондентский счёт
                 * @param bik string БИК
                 * @param bank string Банк
                 * @param dr string Дата рождения
                 * @param registration_address string Адрес регистрации
                 * @param fio string ФИО
                 * @param snils string СНИЛС
                 * @return array
                 * @throws \yii\db\Exception
                 * */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user-requisites/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data?.requisites || null,
                    success: data?.status || false,
                    status,
                };
            },

            deletePartnerDetails: async (id) => {
                /**
                 * POST
                 * Удаляет реквизиты из базы
                 * @param int id ID реквизитов в базе
                 * @return array|true[]
                 * @throws \Throwable
                 * @throws \yii\db\StaleObjectException
                 * */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user-requisites/delete",
                    data: { id },
                });
                return {
                    error: error || data?.error || null,
                    data: data || null,
                    success: data?.status || false,
                    status,
                };
            },

            getPayoutStatus: async () => {
                /**
                 * GET
                 * Возвращает список статусов для выплат
                 * @return array
                 * @throws \yii\db\Exception
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/list/get-payout-status",
                });

                return { error, data, status };
            },

            getUserBalance: async (id) => {
                /**
                 * GET
                 * Возвращает баланс пользователя c историей операций
                 * @param int $user_id ID пользователя
                 * @return array
                 * @throws \yii\db\Exception
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/billing/get-balance",
                    params: { user_id: id },
                });

                return {
                    error,
                    data: data.billing || undefined,
                    status,
                };
            },

            getPaymentHistory: async (id) => {
                /**
                 * GET
                 * Возвращает историю операций по балансу пользователя. Если операция списания - amount будет отрицательный
                 * @param int $user_id ID пользователя
                 * @return array
                 * @throws \yii\db\Exception
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/billing/get-history",
                    params: { user_id: id },
                });

                return { error, data, status };
            },

            setUserPayout: async (dataPayout) => {
                /**
                 * POST
                 * Создаёт запрос на выплату. Проверяет баланс и наличие предыдущих запросов.
                 * @param int user_id ID пользователя
                 * @param decimal amount сумма выплаты. Разделитель точка
                 * @param int requisites_id ID реквизитов пользователя
                 * @param int out_requisites_id ID реквизитов, куда отправлять деньги
                 * @param int comment Комментарий пользователя
                 * @param decimal commission Комиссия. Разделитель точка
                 * @return array|true[]
                 * @throws \yii\db\Exception
                 */

                const { error, data } = await api({
                    method: "post",
                    url: "api/payout/set",
                    data: dataPayout,
                });

                return {
                    error,
                    data,
                    success: data?.status || false,
                };
            },

            getIssetPayout: async (id) => {
                /**
                 * GET
                 * Возвращает запрошенную выплату, если она есть.
                 * @param $user_id ID пользователя
                 * @return array
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/payout/get-isset",
                    params: { user_id: id },
                });

                return {
                    error,
                    data: data.payout || undefined,
                    status,
                };
            },
            updateUser: async (formData) => {
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user/update-user",
                    data: formData,
                });

                return {
                    error,
                    data: data.user || undefined,
                    status,
                };
            },

            // =================
            // admin-payout
            // =================

            getPayoutFullList: async (id) => {
                /**
                 * GET
                 * Возвращает список всех выплат по системе с возможностью фильтрации по статусу
                 * @param int $status ID статуса. Если не передан - возвращаются все выплаты
                 * @return array
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/payout/full-list",
                    params: { status: id },
                });

                return {
                    error: error || undefined,
                    data,
                    status,
                };
            },
            payoutSucces: async (payoutData) => {
                /**
                 * POST
                 * Подтверждает проведение выплаты и ставит задание на уменьшение баланса в очередь
                 * @param int payout_id ID выплаты в базе
                 * @param int user_id ID пользователя в базе
                 * @return array|true[]
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/payout/success",
                    data: payoutData,
                });

                return { error, data, status };
            },

            offerIssetByUser: async () => {
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer/isset-by-user",
                });

                return { error, data, status };
            },

            getOffersByParams: async (paramsFilter) => {
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer/get-by-params",
                    params: paramsFilter,
                });

                return { error, data, status };
            },

            payoutFail: async (payoutData) => {
                /**
                 * POST
                 * Отклоняет выплату
                 * @param int payout_id ID выплаты
                 * @return array|true[]
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/payout/fail",
                    data: payoutData,
                });

                return { error, data, status };
            },
            setUserFavorites: async (dataFavorite) => {
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user-favorites/set",
                    data: dataFavorite,
                });

                return { error, data, status };
            },
            delUserFavorites: async (dataFavorite) => {
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/user-favorites/delete-by-params",
                    data: dataFavorite,
                });

                return { error, data, status };
            },

            setOfferToUser: async (dataConnect) => {
                /**
                 * POST
                 * Связывает оффер с пользователем
                 * @param offer_id int ID офера
                 * @param user_id int ID пользователя
                 * @return array
                 * @throws \yii\db\Exception
                 */
                const { error, data, status } = api({
                    method: "post",
                    url: "api/offer/set-offer-to-user",
                    data: dataConnect,
                });

                return { error, data, status };
            },

            //
            //paths
            //

            getPathList: async () => {
                /**
                 * GET
                 * Возвращает список всех шагов
                 * @return array
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/path/get-list",
                });
                return {
                    error: error || data?.error || null,
                    data: data.path || null,
                    success: data?.status || false,
                    status,
                };
            },

            getPathById: async (id) => {
                /**
                 * GET
                 * Возвращает шаг по ID
                 * @param int id  ID получаемого шага
                 * @return array
                 */

                const { error, data, status } = await api({
                    method: "get",
                    url: "api/path/get-by-id",
                    params: { id },
                });
                return {
                    error: error || data?.error || null,
                    data: data.path || null,
                    success: data?.status || false,
                    status,
                };
            },

            createPath: async (requestData) => {
                /**
                 * POST
                 * Добавляет Шаг в базу
                 * @param int offer_id ID оффера
                 * @param int path_id ID шага
                 * @param int amount Сумма
                 * @param string type Тип шага. Может быть pay|freeze
                 * @param int pay_interval Интервал
                 * @param int success ID шага после успеха
                 * @param int fail ID шага после ошибки
                 * @return array
                 * @throws \yii\db\Exception
                 */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/path/set",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data.path || null,
                    success: data?.status || false,
                    status,
                };
            },

            updatePath: async (requestData) => {
                /**
                 * POST
                 * Обновляет шаг в базе. Обязателен только параметр ID
                 * Возвращает объект шага или ошибку
                 * @param int id ID шага в базе
                 * @param int offer_id ID оффера
                 * @param int path_id ID шага
                 * @param int amount Сумма
                 * @param string type Тип шага. Может быть pay|freeze
                 * @param int pay_interval Интервал
                 * @param int success ID шага после успеха
                 * @param int fail ID шага после ошибки
                 * @return array
                 * @throws \yii\db\Exception
                 */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/path/update",
                    data: requestData,
                });
                return {
                    error: error || data?.error || null,
                    data: data.path || null,
                    success: data?.status || false,
                    status,
                };
            },

            deletePath: async (id) => {
                /**
                 * POST
                 * Удаляет шаг
                 * @param int ID
                 * @return array|true[]
                 * @throws \Throwable
                 * @throws \yii\db\StaleObjectException
                 */

                const { error, data, status } = await api({
                    method: "post",
                    url: "api/path/delete",
                    data: { id },
                });
                return {
                    error: error || data?.error || null,
                    data: data.path || null,
                    success: data?.status || false,
                    status,
                };
            },

            getOffersToUser: async (searchParams) => {
                const { error, data, status } = await api({
                    method: "get",
                    url: "api/offer/get-offer-to-user",
                    params: searchParams,
                });

                return {
                    error,
                    data: data?.offerToUser || undefined,
                    status,
                };
            },

            delOfferToUser: async (dataOffer) => {
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/offer/del-offer-to-user",
                    data: dataOffer,
                });

                return { error, data, status };
            },


            //ex-form

            sendMainPageForm: async (formData) => {
                // /
                // * POST
                //     * Принимает форму для отправки на почту (Форма с лендинга: Опишите ваш вопрос или предложение)
                // * @param string name Имя
                //     * @param string tel Телефон
                //     * @param string tg Телеграм
                //     * @param string comment Комментарий
                //     * @return array|true[]
                //         */
                const { error, data } = await api({
                    method: "post",
                    url: "api/ex-form/pm-offer",
                    data: formData,
                });

                return {
                    error,
                    success: data.status
                };
            },

            sendAdvertiserPageForm: async (formData) => {
                // /
                // * POST
                //     * Принимает форму для отправки на почту (Форма с лендинга: Регистрация рекламодателя)
                // * @param string name Имя
                //     * @param string link Ссылка на офер
                //     * @param string tg Телеграм
                //     * @param string comment Комментарий
                //     * @return array|true[]
                //         */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/ex-form/reg-rekl",
                    data: formData,
                });

                return { error, data, status };
            },

            sendHighRiskPageForm: async (formData) => {
                /**
                 * POST
                 * Принимает форму для отправки на почту (Форма с лендинга: Хочу принимать платежи)
                 * @param string name Имя
                 * @param string link Ссылка на офер
                 * @param string tg Телеграм
                 * @param string comment Комментарий
                 * @return array|true[]
                 */
                const { error, data, status } = await api({
                    method: "post",
                    url: "api/ex-form/get-pay",
                    data: formData,
                });

                return { error, data, status };
            },
        };


        Vue.provide("$http", Vue.config.globalProperties.$http);
    },
};
