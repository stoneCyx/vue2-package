"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scrollbarWidth = _interopRequireDefault(require("element-ui/src/utils/scrollbar-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TableLayout {
  constructor(options) {
    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.gutterWidth = (0, _scrollbarWidth.default)();

    for (const name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }

    if (!this.store) {
      throw new Error('store is required for Table Layout');
    }
  } // 获取放平之后的每一列的数据


  getFlattenColumns() {
    const flattenColumns = [];
    const {
      columns
    } = this.table;
    columns.forEach(column => {
      if (column.isColumnGroup) {
        flattenColumns.push.apply(flattenColumns, column.columns);
      } else {
        flattenColumns.push(column);
      }
    });
    return flattenColumns;
  } // 观察者模式，用于更新列的变化和滚动条的变化


  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(event) {
    const {
      observers
    } = this;
    observers.forEach(observer => {
      switch (event) {
        case 'columns':
          observer.onColumnsChange(this);
          break;

        case 'scrollable':
          observer.onScrollableChange(this);
          break;

        default:
          throw new Error("Table Layout don't have event ".concat(event, "."));
      }
    });
  }

}

var _default = TableLayout;
exports.default = _default;