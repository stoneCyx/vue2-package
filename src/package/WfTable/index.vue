<template>
    <div class="vpack-table">
        <div class="hidden-columns" ref="hiddenColumns">
            <slot></slot>
        </div>
        <table-body fixed="right" :store="store" />
    </div>
</template>

<script>
import { createStore, mapStates } from './store/helper.js'
import TableBody from './table-body.vue'
import TableLayout from './table-layout'

let tableIdSeed = 1;

export default {
  name: 'VpackTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    rowKey: [String, Function],
  },
  components: { TableBody },
  data() {
    this.store = createStore(this, {
      rowKey: this.rowKey,
    });
    // tablelayout实例，所有Dom相关的操作都在这个对象实例里面
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
    })
    return {
      layout,
    };
  },
  computed: {
    // tablelayout 里面的 getFlattenColumns 方法需要用到，要用列的数据进行处理
    ...mapStates({
      columns: 'columns',
    }),
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      },
    },
  },
  created() {
    this.tableId = `vpack-table_${tableIdSeed++}`
  },
};
</script>
<style lang="scss" scoped>
.hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
}
</style>
