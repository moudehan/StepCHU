module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["unused-imports"],
  rules: {
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "no-unused-vars": "error",
    "unused-imports/no-unused-imports": "error",
  },
};
