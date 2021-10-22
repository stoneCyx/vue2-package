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
    },
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
          this.updateColumns()
      }
    }
  }
})