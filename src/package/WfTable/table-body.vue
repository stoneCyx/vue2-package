<script lang="jsx">
import { mapStates } from './store/helper.js';
import LayoutObserver from './layout-observer.js';
export default {
    name:'WfTableBody',
    mixins: [LayoutObserver], // 使用观察者模式来
    props: {
      // mapStates中,helpre使用了 this.store，如果不引入store则this.store报错
      store:{
        require:true,
      },
      context: {}
    },    
    computed: {
      ...mapStates({
        data:'data',
        columns: 'columns',
      }),
      firstDefaultColumnIndex() {
        return this.columns.findIndex(({ type })=> type === 'default'); 
      },
      table() {
        return this.$parent;
      }
    },
    render(h) {
      const data = this.data || [];
      // 设置col的宽度来控制每一列的宽度
      return (
        <table>
          <colgroup>
            {
              this.columns.map(column => <col name={ column.id } key={column.id} />)
            }
          </colgroup>
          <tbody>
            {
              data.reduce((acc, row) => {
                return acc.concat(this.wrappedRowRender(row,acc.length))
              },[])
            }
          </tbody>
        </table>
      )
    },
    created() {
       
    },
    mounted() {
     
    },
    methods: {
      getCellClass(rowIndex, columnIndex, row, column) {
        const classes = [column.id, column.align, column.className];

        const cellClassName = this.table.cellClassName;
        if (typeof cellClassName === 'string') {
          classes.push(cellClassName);
        } else if (typeof cellClassName === 'function') {
          classes.push(cellClassName.call(null,{
            rowIndex, columnIndex, row, column
          }));
        }
        classes.push('vpack-table__cell');
        return classes.join(' ');
      },
      getCellStyle(rowIndex, columnIndex, row, column) {
        const cellStyle = this.table.cellStyle;
        if(typeof cellStyle === 'function') {
          return cellStyle.call(null,{
            rowIndex,
            columnIndex,
            row,
            column
          })
        }
        return cellStyle;
      },
      rowRender(row, $index) {
        const { columns } = this;
        return (
          <tr>
            {
              columns.map((column, cellIndex) => {
                const columnData = { ...column }
                const data = {
                  store: this.store,
                  _self: this.context || this.table.$vnode.context,
                  column: columnData,
                  row,
                  $index
                };
                return (
                  <td
                    style={ this.getCellStyle($index, cellIndex, row, column) }
                    class={ this.getCellClass($index, cellIndex, row, column) }
                  >
                    { column.renderCell.call(
                      this._renderProxy,
                      this.$createElement,
                      data,
                      null
                    ) }
                  </td>
                )
              })
            }
          </tr>
        )
      },
      wrappedRowRender(row, $index) {
        const tr = this.rowRender(row, $index);
        return tr;
      }
    }
}
</script>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
}
tbody {
  color: #333333;
  border-collapse: collapse;
  td {
    border: #ddd solid 1px;
    padding: 12px;
    margin-top: -1px;
    margin-left: -1px;
    background-color: #ffffff;
  }
}
</style>