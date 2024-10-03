# :green_book: Запуск проекта

#### :small_orange_diamond: Установка
```
 git clone https://github.com/NikGor20/front_pmv4.git
```

#### :small_orange_diamond: Перейти в папку с проектом

```
 cd front_pmv4
```

#### :small_orange_diamond: Установка зависимостей

```
 npm i
```

#### :small_orange_diamond: запуск сервера разработки

```
 npm run serve
```

## :triangular_flag_on_post: Используемые технолигии
<ul>
    <li>Vue 3 (composition API)</li>
    <li>Pinia - state management</li>
    <li>SCSS</li>
    <li>Quasar - ui library</li>
    <li>Eslint v8.57.0</li>
    <li>Vite</li>
</ul>

## :loop: Eslint команды

#### :small_blue_diamond: Проверка синтаксиса

```
 eslint --ext .js,.vue --ignore-path .gitignore src
```

#### :small_blue_diamond: Проверка синтаксиса и устранение ошибок

```
 eslint --ext .js,.vue --ignore-path .gitignore --fix src
```
## :file_folder: Структура проекта

```
 project/
├─ publick
│   ├─ images/
│   └─ icons/
├─ src
│   ├─ api/ обращения к API
│   ├─ assets/ Стили и шрифты
│   ├─ components/
│   │  ├─ block/ строительный материал для pages
│   │  └─ ui/ более мелкие компоненты для block
│   ├─ core/ Найстроки router, store, axios
│   ├─ layout/ шаблоны
│   ├─ pages/ странницы
│   ├─ shared/ переиспользуемый функционал
│   └─ utils/ валидаторы, конфигурации
├─ App.vue
├─ main.js
├─ .env
├─ .eslintrc.cjs
└─ vite.config.js
```

# :bulb: Стратегия работы с Git (за основу взята стратегия GitFlow)

Стратегия Gitflow предполагает наличие постоянных веток для разработки и деплоя, а так же набора временных вспомогательных веток для работы с постоянными ветками.

![CI-CD-branches](https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189671&inputFormat=png&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!N1dINbxvq0OKMoavCq-vYZ5K6_gb_bREj9Flz8QvUCGo2m-KshMQTZnmQ0j1x4KQ%2Fitems%2F01T2QKBGEVBLO6GWYHENFIZNITMTH53WQ6%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiIzNTQ4NTczNy02ZmJjLTQzYWItOGEzMi04NmFmMGFhZmFmNjEiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MjI1MTM2MDAifQ.IYkVdWyKCCZ3Qj3Zi6uV3fC30ZvZQs2g9wO1aOIloxfprKYLjuL795uICMSf_OMMncay0VWwBeG0UwD5-BWSAZLq4HaM-IQYakORNlJFDz6mvwFZoGPC5LLSlWrHpbube1UoazEXIcDV8seaq5PxvYfpncGbzviTfRpUdy2j6dWMXKugjvLq_gmTf50cTN2AwkcazMeiUA2Uqfm2dGT1hcMsF1GYgWdTjOYLVZyEIsHP4MDxrCoUkCVjx_vz5EnMzhtFEOR8E_zQdCjrDH5yqx8e9UdYCU1NtaLJmoaCUMCphTXVqI8Mu6qQ_7qRakffAdC6rjt9-A3u6Ya7l66eTzJSL7Wd1KaxISTzIdwhhxfqfZ9S5TTaEVz0cWlR2DkG.FpqfCypnxOA3rRLjQ9aWrgt1J5s2zSDKR28BPwS4LrA%26version%3DPublished&cb=63858089466&encodeFailures=1&width=1658&height=1230)
### Постоянные ветки:

-   **master**. В ветке **master** хранится <u>**только рабочий код**</u>, готовый в любой момент к выгрузке в боевую среду.

-   **develop**. Ветка **develop** предназначена для разработки. В нее сливаются оттестированные изменения из **feature**-веток, **bugfix**-веток и прочих. Потенциально может быть нестабильна.

### Вспомогательные ветки:

-   **feature**

Под каждую новую функциональность создается новая ветка **feature**. Создается всегда на основе ветки **develop**. Обратное слияние с веткой **develop** происходит только после полного тестирования новой функциональности.

-   **bugfix**

Ветки **bugfix** предназначены для исправления ошибок предыдущих релизов. Аналогично веткам **feature** создаются на основании ветки **develop**.

## Правила именования веток

-   Название ветки должно четко и ясно давать представление о том, что именно делает код в данной ветке.
-   Используется только нижний регистр.
-   Используются только символы **a-z, 0-9**, не содержит специальных символов.
-   Слова разделяются дефисами.
-   В начале пишется название вспомогательной ветви, затем "**/**".
-   Если есть оформленная задача, её номер необходимо добавить после названия вспомогательной ветви.:
-   Пример именования веток:
    -   feature/#4671-page-indi
    -   bugfix/restore-password-error

## Правила именования коммитов

-   Название коммита должно быть информативными, отражать то, что делает код в этом коммите.
-   Для подробного описания коммита следует использовать тело сообщения коммита(отделяется от заголовка пустой строкой).
-   Желательно указывать префикс перед названием коммита.
    -   **feat** - новая фича
    -   **fix** - исправление ошибки
    -   **style** - изменения, которые не влияют на смысл кода, связаны с форматированием кода, например пробелами, отсутствием точек с запятой и т.п.,
    -   **chore** - изменения, которые не относятся к исправлению или новой функции и не изменяют src или тестовые файлы (например, обновление зависимостей)
    -   **docs** - обновления документации, такой как README или других
    -   **refactoring** - улучшение кода, не вносящее новой функциональности и не являющееся фиксом
    -   **build** - изменения, влияющие на систему сборки или внешние зависимости
    -   **perf** - оптимизация производительности
-   Начинается с заглавной буквы без точки в конце.
-   Код в коммите должен быть логически завершенным.
-   Примеры коммитов:
    -   `feat: Improve performance with lazy load implementation for`
    -   `chore: Update npm dependency to latest version`
    -   `feat: Добавлена функция обработки аутентификации`

## Работа с запросами на слияние (pull requests) в ветку **develop**

Для того, чтобы слить изменения из одной ветки в другую используются **запросы на слияние**. Не допускаются коммиты напрямую в ветки **develop** и **master**.

Все новые ветки должны сначала сливаться в ветку **develop**, затем после тестирования на **тестовом**-домене, изменения вливаются через **pull-request** в **master**-ветку.

**Запрос на слияние** создается через веб-интерфейс. Нужно открыть код исходной ветки, в выпадающем меню **Contribute** выбрать пункт **Open pull request**. Либо на главной странице проекта нажать на кнопку **Compare & pull request**.

![compare_and_pull](https://github.com/NikGor20/front_pmv4/blob/imgDocs/img/pullrequest.png)

В верхней панели нужно проверить корректность заполнения исходной и целевой веток. Целевая ветка обозначена как **base:**, исходная как **compare:**.

Название запроса на слияние должно совпадать с названием исходной ветки.

В описании запроса нужно добавить:

-   Назначение исходной ветки (новый функционал, исправление оибок и прочее)
-   Общие сведения о том, что изменилось
-   Какой функционал проекта был затронут внесенными изменениями
-   Изображения или другой материал при необходимости.

В панели справа необходимо добавить:

-   Ревьюеров для проверки кода. Раздел **Reviewers**
-   Ответственного за слияние в целевую ветку. Раздел **Assignees**

![pr_formalization](https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189671&inputFormat=png&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!N1dINbxvq0OKMoavCq-vYZ5K6_gb_bREj9Flz8QvUCGo2m-KshMQTZnmQ0j1x4KQ%2Fitems%2F01T2QKBGGAWI6ZIYA53NH25JXD6PMWJB7Q%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiIzNTQ4NTczNy02ZmJjLTQzYWItOGEzMi04NmFmMGFhZmFmNjEiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MjI1MTM2MDAifQ.EaakoOOAP2IzS9SJFy4dhAmkiHkLZSzEEp6YkOPKOjwgU1rEHBc6HsJRV4wEUU5EYr2wZBHc-ovDew1VycnOE9CZ908y_cFPWrTlTfy3W6IoL_nH3bvaLaNHh36lX1rGGRzSIvLOmi2g6YyGR2EPVuUp_HE4zOENEOtLhO9k0CcTwX4kzE21QV1j4zhUqxuHb72Yu_tTZP8yK0FJd-vjJv6u_e3UWRCr0zI74QuhyMVPJBAx0nWkKVY1dP8unJXueYwCFYIaXo9M9Py5vrl3tbxzeiO6IrF8uc460yv_718UOIVFN0juxHlEJ-8XhoO2pJbQif4wJ-hCpCps8TRWrqURc9eG3nEoVfADmiurN2EVD6hlh-O0iWiWB5_KP1QR.M6BYRLwOrxIs9X5_WAoHXRNsBViCmF5vuDagEETMFzU%26version%3DPublished&cb=63858095955&encodeFailures=1&width=1464&height=1230)

После создания запроса на слияние github проверит наличие конфликтов между исходной и целевой ветками. Если нельзя автоматически слить ветки, появится соответствующее предупреждение.

![has_merge_conflicts](https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189671&inputFormat=png&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!N1dINbxvq0OKMoavCq-vYZ5K6_gb_bREj9Flz8QvUCGo2m-KshMQTZnmQ0j1x4KQ%2Fitems%2F01T2QKBGDPJLKHUNQWQ5CJEDU4XSNV3IF2%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiIzNTQ4NTczNy02ZmJjLTQzYWItOGEzMi04NmFmMGFhZmFmNjEiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MjI1MTM2MDAifQ.3c_hMy1GKcJkfd35LoAbFr6RrgJCrjp9U6BwJ_NNNX6KuxiQRT4-WlEdS7bSPo2o3WMWblFGEG2KCUGLKDx6TQ4a8dkXkVeLngZHcQ7pnnni8JBrF19GBebKOmfyoCdcqSuZSGuurRqKXbCcclwAqVytsYYyAfJK9duOpHxTVsROij_3zP8F78h563N87KWyQsel8pjkW1_kqfvWHYxadeuUa8iqjlOREZ5NQqNxQvjQCBx8lRJ1-0IsbbWbVEinlih2zSpNWxkPyEyXaWq7EgK3Dsc54-8_mqOUtnY0nfcm5l-0wWk48RV_pDOEyZX3LMK40RVP7buHWMo7_kPd_01UKlIuQqRtaows6kPYqrhbgafOQfVOqW9Z53dIU4DL.TnS3DwwYdk1XK789Gz8QXX0GpsvIUOf3Tqr-DgDnG4g%26version%3DPublished&cb=63858095956&encodeFailures=1&width=1464&height=1230)

В этом случае необходимо вручную локально в среде разработки слить ветку **develop** в рабочую ветку и через редактор разрешения конфликтов внести исправления. После чего отправить их в удаленный репозиторий.

> [!CAUTION] Чтобы предотвратить часто возникающие конфликты слияния, следует дополнительно подтягивать изменения из **develop** в рабочую ветку не реже двух раз в день.


