/** @type {import('eslint').Linter.Config} */
module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier", // Prettier siempre al final
    ],
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": "off", // no necesario con Vite
        "@typescript-eslint/no-unused-vars": ["warn"],
    },
};
