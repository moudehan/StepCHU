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
    // "no-unused-vars": "error",
    // "unused-imports/no-unused-imports": "error",
    // trailingComma: "all",
  },
};
