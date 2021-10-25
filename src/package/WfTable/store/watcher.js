import Vue from 'vue';

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
    updateColumns() {
      const states = this.states;
      const _columns = states._columns || [];
      states.columns = _columns;
    },
  }
})