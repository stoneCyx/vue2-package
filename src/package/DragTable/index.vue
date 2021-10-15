<template>
  <div >
      <table v-if="paramsData.length" class="itxst">
        <tbody is="draggable" v-model="paramsData" animation="500" filter=".forbid" force-fallback="true">
          <tr v-for="(item,index) in paramsData" :key="index" class="fild-row move">
            <td :class="{ ellipse }">{{ item.value }}</td>
            <td>2</td>
            <td class="delete-row forbid">5</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  name: 'DragTable', 
  components: { draggable },
  props:{
    ellipse:{
        type: Boolean,
        default: true
    }
  },
  data() {
    return {
      paramsData: [{key:11,value:'打发阿斯顿发按时打撒旦法撒旦法'},{key:12,value:'阿斯顿发阿斯顿发'},{key:121,value:'阿斯顿发阿斯顿发'},{key:123,value:'阿斯顿发阿斯顿发'}],
    }
  }
}
</script>
<style scoped lang="scss">
$warp:100%;
.fild-row{
  display: flex;
}
/*定义要拖拽元素的样式*/
table.itxst {
    color: #333333;
    border-collapse: collapse;
    width:$warp;
}

table.itxst td {
    border: #ddd solid 1px;
    width:200px;
    padding: 12px;
    margin-top:-1px;
    margin-left:-1px;
    background-color: #ffffff;
}
.ellipse{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
table.itxst tr {
    cursor: move;
}
table.itxst td.move:hover {
    cursor: move;
}
table.itxst td.delete-row{
//    width:40px;
   cursor: default;
  i{
    cursor: pointer;
    margin-top:10px;
    margin-left:4px;
  }
}
</style>
