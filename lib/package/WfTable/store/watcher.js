"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const doFlattenColumns = columns => {
  const result = [];
  columns.forEach(column => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

var _default = _vue.default.extend({
  data() {
    return {
      states: {
        rowKey: null,
        _columns: [],
        data: [],
        columns: []
      }
    };
  },

  methods: {
    updateColumns() {
      const {
        states
      } = this;

      const _columns = states._columns || [];

      states.fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
      states.rightFixedColumns = _columns.filter(column => column.fixed === 'right');

      if (states.fixedColumns.length > 0 && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
      }

      const notFixedColumns = _columns.filter(column => !column.fixed);

      states.orginColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);
      const leafColumns = doFlattenColumns(notFixedColumns);
      const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);
      states.leafColumnsLength = leafColumns.length;
      states.fixedLeafColumnsLength = fixedLeafColumns.length;
      states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;
      states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
      states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
    }

  }
});

exports.default = _default;