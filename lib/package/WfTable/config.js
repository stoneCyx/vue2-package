"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cellForced = void 0;
exports.defaultRenderCell = defaultRenderCell;

var _util = require("element-ui/src/utils/util");

const cellForced = {
  // selection 类型的列的渲染函数，直接渲染成checkbox
  selection: {
    renderCell: function renderCell(h, _ref) {
      let {
        row,
        column,
        store,
        $index
      } = _ref;
      return h("input", {
        attrs: {
          type: "checkbox"
        }
      });
    }
  },
  // index 类型的列的渲染函数，直接渲染成下标+1
  index: {
    renderCell: function renderCell(h, _ref2) {
      let {
        column,
        $index
      } = _ref2;
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return h("div", [i]);
    }
  }
}; // 默认类型的渲染函数

exports.cellForced = cellForced;

function defaultRenderCell(h, _ref3) {
  let {
    row,
    column,
    $index
  } = _ref3;
  const property = column.property;
  const value = property && (0, _util.getPropByPath)(row, property).v;

  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }

  return value;
}