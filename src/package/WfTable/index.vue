<template>
<div class="wf-table">
  <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <table
      class="wf-table__body"
    >
      <tbody>
        <tr v-for="(item,index) of data" :key="index" >
          <td v-for="(key,i) of keys" :key="i">
            {{ item[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <table-body
      fixed="right"
      :store="store"
    />
</div>
</template>
<script>
import { createStore } from './store/helper';
import TableLayout from './table-layout.js';
import TableBody from './table-body.vue';
let tableIdSeed = 1;
export default {
    name:'Table',
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      rowKey:String,
      defaultExpandAll:Boolean
    },    
    components: { TableBody },
    data(){
      this.store = createStore(this,{
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll,
      });
      const layout = new TableLayout({
        store: this.store,
        table: this
      })
      return {
        layout
      }
    },
    watch: {
        data: {
        immediate: true,
        handler(value) {
          this.store.commit('setData', value);
        }
      }
    },
    computed: {
      keys() {
        return Object.keys(this.data[0]);
      }
    },
    created() {
        this.tableId = 'el-table_' + tableIdSeed++;
    },
    mounted() {
      this.$ready = true;
    },
    methods: {
      doLayout() {
        this.layout.updateColumnsWidth();
      },
      debouncedUpdateLayout() {

      },
      wrappedRowRender(data) {
        return ;
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