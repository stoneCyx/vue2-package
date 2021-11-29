"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _watcher = _interopRequireDefault(require("./watcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_watcher.default.prototype.mutations = {
  setData(states, data) {
    states.data = data;
  },

  insertColumn(states, column, index) {
    // 此处array就是states._columns，数组赋值是引用传递
    let array = states._columns;

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    } // 更新列信息


    this.updateColumns();
  },

  removeColumn(states, column, parent) {
    let array = states._columns;

    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (array) {
      array.splice(array, indexOf(column), 1);
    }

    if (this.table.$ready) {
      this.updateColumns();
    }
  }

};

_watcher.default.prototype.commit = function (name) {
  const {
    mutations
  } = this;

  if (mutations[name]) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // this指向的是store，也就是watcher对象的实例。
    mutations[name].apply(this, [this.states].concat(args)); // mutations[name](this.states,args);  如果此处不用apply this指向的是 Watcher.prototype.mutations 定义的json对象
  } else {
    throw new Error("Action not found: ".concat(name));
  }
};

var _default = _watcher.default;
exports.default = _default;