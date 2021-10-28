<script lang="jsx">
import { cellForced, defaultRenderCell } from './config'
import { mergeOptions, compose, parseWidth, parseMinWidth } from './util'

let columnIdSeed = 1;
export default {
  name: 'ElTableColumn',
  props: {
    prop: String,
    label: String,  
    type: {
      type: String,
      default: 'default'
    },
    index: [Number, Function],
    width: {},
    minWidth: {},
    selectable: Function,
    reserveSelection: Boolean
  },
  data() {
    return {

    };
  },
  computed: {
    realWidth() {
      return parseWidth(this.width);
    },
    realMinWidth() {
      return parseMinWidth(this.minWidth);
    },
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
    //compose 中第一个执行的函数 添加默认的 renderCell
    setColumnForcedProps(column) {
      // 对于特定类型的 column，某些属性不允许设置
      const type = column.type;
      const source = cellForced[type] || {};
      Object.keys(source).forEach(prop => {
        let value = source[prop];
        if (value !== undefined) {
          column[prop] = prop === 'className' ? `${column[prop]} ${value}` : value;
        }
      });
     // 针对selection类型和index类型进行特殊处理,定义这两种类型的renderCell函数
     // type为 default 的列没有定义renderCell函数
      return column;
    },
    // compose中第二个执行的函数 设置列宽
    setColumnWidth(column) {
      // realWidth 是用户输入的width字段
      if (this.realWidth) {
        column.width = this.realWidth;
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth;
      }
      // 无设置最小列宽，则列宽最小为80px
      if (!column.minWidth) {
        column.minWidth = 80;
      }
      column.realWidth = column.width === undefined ? column.minWidth : column.width;
      return column;
    },
    // compose 中第三个执行的函数，定义每一列的renderCell
    setColumnRenders(column) {
      // 设置 column 的render函数
      let originRenderCell =column.renderCell;
      //如果是可展开的列，则特殊处理
      if (column.type === 'expand') {
        column.renderCell = (h, data) => (<div class="cell" >
          { originRenderCell(h, data) }
        </div>);
        this.owner.renderExpanded = (h, data) => {
          return this.$scopedSlots.default ? this.$scopedSlots.default(data) : this.$slots.default;
        }
      } else {
        // default 类型的列处理
        originRenderCell = originRenderCell || defaultRenderCell;
        // 对 renderCell 进行包装
        column.renderCell = (h, data) => {
          let children = null;
          // 如果有子组件，则直接用子组件渲染
          if (this.$scopedSlots.default) {
            children = this.$scopedSlots.default(data); 
          } else {
          // 没有子组件，则使用默认方法处理
            children = originRenderCell(h, data);
          }
          const props = {
            class: 'cell',
            style: {}
          };
          if (column.showOverflowTooltip) {
            props.class += ' vpack-tooltip';
            props.style = { width: (data.column.realWidth || dta.column.width) -1 + 'px' }
          }
          return (<div { ...props }>
            { children }
          </div>)
        };
      }
      return column;
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
  beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
    this.columnId = ''
  },
  created() {
    const parent =  this.columnOrTableParent;
    this.isSubColumn = this.owner !== parent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
    const type = this.type || 'default';
    const defaults = {
      type,
      id: this.columnId,
      property: this.prop || this.property,
      index: this.index
    }
    // 配置字段
    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type','renderHeader', 'formatter', 'fixed', 'resizable'];
    const sortProps = ['sortMethod', 'sortBy', 'sortOrders'];
    const selectProps = ['selectable', 'reserveSelection'];
    const filterProps = ['filterMethod', 'filters', 'filterMultiple', 'filterOpened', 'filteredValue', 'filterPlacement'];

    let column = this.getPropsData(basicProps, sortProps, selectProps, filterProps);
    column = mergeOptions(defaults, column);
    // compose 中执行顺序是从左到右，三个函数主要就是为了给列加上默认的字段和渲染函数
    const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);
    column = chains(column);
    // 主要工作就是把列的各种配置字段添加好
    this.columnConfig = column;
  },
  mounted() {
    const owner = this.owner;
    const parent = this.columnOrTableParent;
    const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;
    const columnIndex = this.getColumnElIndex(children, this.$el);
    //所有处理数据的操作只为了这一步，添加列信息
    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
 },
  destoryed() {
    if (!this.$parent) return;
    const parent = this.$parent;
    this.owner.store.commit('removeColumn', this.columnConfig, this.isSubColumn ? parent.columnConfig : null);
  },
  render(h){
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default);
  },
}
</script>
