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
      isSubColumn: false,
      columns: []
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
    },

    realWidth() {
      // return parseWidth(this.width)
    }
  },

  methods: {
    createRow(){ 
      const data = this.$parent.data;
      const { prop, index } = this;
      let arr = [];
      data.forEach(item=>{

      })
      return data[index][prop];
    },
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
    // const chains = compose(this.setColumnRenders);
    // column = chains(column);

    this.columnConfig = column;
  },
  mounted() {
    const owner = this.owner;
    const parent = this.$parent;
    const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;
    const columnIndex = this.getColumnElIndex(children, this.$el);

    owner.store.commit('insertColumn',this.columnConfig, columnIndex);
  }
}
</script>
