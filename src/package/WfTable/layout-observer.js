export default {
  created() {
    this.tableLayout.addObserver(this);
  },

  destroyed() {
    this.tableLayout.removeObserver(this);
  },

  computed: {
    tableLayout() {
      let layout = this.layout;
      if (!layout && this.table) {
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error('Can not find table layout.');
      }
      return layout;
    }
  },

  mounted() {
    this.onColumnsChange(this.tableLayout);
  },

  updated() {
    this.onColumnsChange(this.tableLayout);
  },

  methods: {
    onColumnsChange(layout) {
      // 获取 colgroup > col 通过设置col的宽度达到设置每一列的宽度的目的.
      const cols = this.$el.querySelectorAll('colgroup > col');
      if (!cols.length) return;
      const flattenColumns = layout.getFlattenColumns();
      const columnsMap = {};
      flattenColumns.forEach((column) => {
        columnsMap[column.id] = column;
      });
      for (let i = 0, j = cols.length; i < j; i++) {
        const col = cols[i];
        const name = col.getAttribute('name');
        const column = columnsMap[name];
        if (column) {
          // 以每一列的realWidth字段为他的宽度
          col.setAttribute('width', column.realWidth || column.width);
        }
      }
    },
  }
};
