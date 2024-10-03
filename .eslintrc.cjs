module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    ignorePatterns: [
        './core/router/accessMap.js'
    ],
    globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
        defineModel: "readonly"
    },
    ignorePatterns: [
        'node_modules/',
        'src/core/accessMap.js'
    ],
    rules: {
        'no-useless-escape': 'off',
        "vue/no-setup-props-destructure": "off",
        "vue/valid-v-slot": "off",
        "vue/v-on-event-hyphenation": "off",
        'vue/attribute-hyphenation': 'off',
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 1
            },
            "multiline": {
                "max": 1
            }
        }],
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                ["UNIQUE", "SLOT"],
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT"
            ],
            "alphabetical": false
        }],
    }
}