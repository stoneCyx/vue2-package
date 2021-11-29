"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

require("@/styles/index.scss");

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_elementUi.default);

new _vue.default({
  render: h => h(_App.default)
}).$mount('#app');