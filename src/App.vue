<template>
  <div>
    <div class="item">可编辑输入框：
      <EditInput 
        v-model="tag"
        placeholder="请输入内容" 
      />
    </div>
    <div class="item">可拖拽表格:
      <DragTable />
    </div>
    <div class="item">自定义表格:
      <WfTable :data="tableData">
        <Column type="index" />
        <Column type="selection" />
        <Column prop="date" width="120" label="日期" />
        <Column prop="name" label="姓名" />
        <Column prop="address" width="240" label="地址" />
      </WfTable>
    </div>
  </div>
</template>
<script>
import EditInput from './package/EditInput/index.vue';
import DragTable from './package/DragTable/index.vue';
import WfTable from './package/WfTable/index.vue';
import Column from './package/WfTable/table-column.vue';
export default {
  data(){
    return {
      tag:'',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '张大海',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '赵玲',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '孙悟空',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-12',
        name: '沙悟净',
        address: '上海市普陀区金沙江路 1514 楼'
      }]
    }
  },
  components:{ EditInput, DragTable, WfTable, Column }
}
</script>
<style lang="scss" scoped>
.item{
  padding:10px;
}
</style>