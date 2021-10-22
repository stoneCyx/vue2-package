import Vue from 'vue';

const doFlattenColumns = (columns) =>{
    const result = [];
    columns.forEach(column => {
        if (column.children){
            result.push.apply(result, doFlattenColumns(column.children));
        } else {
            result.push(column);
        }
    })
}

export default Vue.extend({
  data() {
    return {
      states: {
        rowKey: null,
        _columns: [],
        data: [],
        columns: []
      }
    }
  },
  methods: {
    assertRowKey() {
      const rowKey = this.states.rowKey;
      if (!rowKey) throw new Error('[ElTable] prop row-key is required')
    },
    updateColumns() {
       
        const states = this.states;
        const _columns = states._columns || []; 
       
        states.columns = _columns;
        // states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
        // states.rightFixedColumns = _columns.filter((columns) => columns.fixed === 'right');
        // if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        //     _columns[0].fixed = true;
        //     states.fixedColumns.unshift(_columns[0])
        // }

        // const notFixedColumns = _columns.filter(column => !column.fixed);
        // states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);
        // // console.log(notFixedColumns,originColumns);
        // const leafColumns = doFlattenColumns(notFixedColumns    );
        // const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
        // const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

        // states.leafColumnsLength = leafColumns.length;
        // states.fixedLeafColumnsLength = fixedLeafColumns.length;
        // states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

        // states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
        // states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
    },
    scheduleLayout(needUpdateColumns) {
        if (needUpdateColumns) {
            this.updateColumns()
        }
        this.table.debouncedUpdateLayout();
    }
  }
})