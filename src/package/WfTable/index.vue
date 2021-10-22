<template>
  <div class="vpack-table">
    <div class="hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <table-body
      fixed="right"
      :store="store"
    />
  </div>
</template>

<script>
import { createStore } from './store/helper';
import TableBody from './table-body.vue';

let tableIdSeed = 1;

export default {
    name:'VpackTable',
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      rowKey: [String,Function],
    },    
    components: { TableBody },
    data(){
      this.store = createStore(this,{
        rowKey: this.rowKey,
      });
      return {}
    },
    watch: {
        data: {
        immediate: true,
        handler(value) {
          this.store.commit('setData', value);
        }
      }
    },
    created() {
        this.tableId = 'vpack-table_' + tableIdSeed++;
    },
}
</script>
<style lang="scss" scoped>
.hidden-columns {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
</style>