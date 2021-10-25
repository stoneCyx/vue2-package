<script lang="jsx">
import { mergeOptions, compose } from './util'

let columnIdSeed = 1;
export default {
  name: 'ElTableColumn',
  props:{
    prop: String,
    label: String,
  },
  data(){
    return {

    };
  },
  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent() {
      let parent = this.$parent;
      while(parent && !parent.tableId && !parent.columnId){
        parent = parent.$parent;
      }
      return parent;
    }
  },

  methods: {
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if(Array.isArray(cur)){
          cur.forEach((key) => {
            prev[key] = this[key];
          })
        }
        return prev;
      }, {});
    },

    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child);
    }
  },

  render(h){
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default);
  },
  created() {
    const defaults = {
      type: 'default',
      id: this.columnId,
      property: this.prop || this.property,
    }
    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type'];
    const sortProps = ['sortMethod', 'sortBy', 'sortOrders'];
    const selectProps = ['selectable', 'reserveSelection'];
    const filterProps = ['filterMethod', 'filters']

    let column = this.getPropsData(basicProps, sortProps, selectProps, filterProps);    

    column = mergeOptions(defaults, column);

    this.columnConfig = column;
  },
  mounted() {
    const owner = this.owner;
    const parent = this.$parent;
    const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;
    const columnIndex = this.getColumnElIndex(children, this.$el);
    //所有处理数据的操作只为了这一步，添加列信息
    owner.store.commit('insertColumn',this.columnConfig, columnIndex);
  }
}
</script>
