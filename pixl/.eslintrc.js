module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest": true,
  },
  "parser": 'babel-eslint',
  "rules": {
    "react/prefer-stateless-function": "off",
    "react/jsx-one-expression-per-line": "off",
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  }
};
