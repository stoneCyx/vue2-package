<script lang="jsx">
import { mapStates } from './store/helper.js'
export default {
    name:'WfTableBody',
    props: {
      store:{
        require:true,
      },
      context: {}
    },    
    computed: {
      table() {
        return this.$parent;
      },
      ...mapStates({
        data:'data',
        columns: 'columns',
      })
    },
    render(h) {
      const data = this.data || [];
      return (
        <table>
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
      getRowClass(row, rowIndex) {
        const classes = [`el-table__row__${rowIndex}`];
      },
      isColumnHidden (index) {
        return false;
      },
      getSpan(row, column, rowIndex, columnIndex) {
        let rowspan = 1;
        let colspan = 1;
        const fn = this.table.spanMethod;
        if (typeof fn === 'function') {
          const result = fn({ row, column, rowIndex, columnIndex });
          if (Array.isArray(result)) {
            rowspan = result[0];
            colspan = result[1];
          } else if (typeof result === 'object') {
            rowspan = result.rowspan;
            colspan = result.colspan;
          }
        }
        return { rowspan,colspan };
      },
      rowRender(row, $index) {
        const { columns } = this;
        const columsHidden = columns.map((column, index) => this.isColumnHidden(index));
        const rowClass = this.getRowClass(row, $index);
        let display = true;
        let displayStyle = display ? null : { display:'none' };
        return (
          <tr>
            {
              columns.map((column, cellIndex) => {
                const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
                if (!rowspan || !colspan) {
                  return null;
                }
                return (
                  <td>
                    { row[column.property] }
                  </td>
                )
              })
            }
          </tr>
        )

      },
      wrappedRowRender(row, $index) {
        const store = this.store;
        const { isRowExpanded, assertRowKey } = store;
        const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } = store.states;
        // if (this.hasExpandColumn && isRowExpanded(row)) {
          const renderExpanded = this.table.renderExpanded;
          const tr = this.rowRender(row, $index);
          // if (!renderExpanded) {
            // console.error('renderExpanded is required.');
            return tr;
          // }
          return [[
            tr,
            <tr key={'expanded-row__' + tr.key}>
              <td colspan={ this.columnsCount } class="wf-table__cell wf-table__expanded-cell" >
                { renderExpanded(this.$createElement,{ row, $index, store: this.store }) }
              </td>
            </tr>
          ]]
        // }
      }
    }
}
</script>
<style lang="scss" scoped>
.wf-table__body{
    color: #333333;
    border-collapse: collapse;
    width:600px;
  td {
      border: #ddd solid 1px;
      width:200px;
      padding: 12px;
      margin-top:-1px;
      margin-left:-1px;
      background-color: #ffffff;
  }
}
.hidden-columns {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
</style>