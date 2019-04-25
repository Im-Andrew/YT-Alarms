const path = require("path");
const prettierrc = require(path.join(path.dirname(__filename),"/.prettierrc.json" ));
// import prettier config, due to a limitation in prettier-plugin


module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["react", "prettier"],
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", "jsx"]
      }
    ],
    "prettier/prettier": ["error", prettierrc, { "usePrettierrc": false}],
    "max-len": ["error", 80],
    "no-unused-vars": ["warn"],
    "linebreak-style": ["error", "windows"],
    "jsx-a11y/anchor-is-valid": "ignore",
    "import/prefer-default-export": "ignore",
    "react/prefer-stateless-function": [2, { "ignorePureComponents": true }]
  },
  "env": {
    "browser": true,
    "jest": true
  } 
};