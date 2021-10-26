import { getPropByPath } from 'element-ui/src/utils/util'

export const cellForced = {
  // selection 类型的列的渲染函数，直接渲染成checkbox
  selection: {
    renderCell: function(h, { row, column, store, $index }) {
      return <input type="checkbox" />
    }
  },
  // index 类型的列的渲染函数，直接渲染成下标+1
  index: {
    renderCell: function(h, { column,$index }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return <div>{ i }</div>;
    }
  }
}
// 默认类型的渲染函数
export function defaultRenderCell(h, { row, column, $index }) {
  const property = column.property;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
}