<template>
  <div>
    <div class="item">可编辑输入框：
      <EditInput 
        v-model="tag"
        placeholder="请输入内容" 
      />
    </div>
    <div class="item">可拖拽表格
      <DragTable />
    </div>
  </div>
</template>
<script>
import EditInput from './package/EditInput/index.vue';
import DragTable from './package/DragTable/index.vue';
export default {
  data(){
    return {
      tag:''
    }
  },
  components:{ EditInput, DragTable }
}
</script>
<style lang="scss" scoped>
.item{
  padding:10px;
}
</style>