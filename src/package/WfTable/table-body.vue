<script lang="jsx">
import { mapStates } from './store/helper.js'
export default {
    name:'WfTableBody',
    props: {
      // mapStates中,helpre使用了 this.store，如果不引入store则this.store报错
      store:{
        require:true,
      }
    },    
    computed: {
      ...mapStates({
        data:'data',
        columns: 'columns',
      })
    },
    render(h) {
      const data = this.data || [];
      return (
        <table>
          <tbody>
            {
              data.reduce((acc, row) => {
                return acc.concat(this.wrappedRowRender(row,acc.length))
              },[])
            }
          </tbody>
        </table>
      )
    },
    created() {
       
    },
    mounted() {
     
    },
    methods: {
      rowRender(row, $index) {
        const { columns } = this;
        return (
          <tr>
            {
              columns.map((column) => {
                return (
                  <td>
                    { row[column.property] }
                  </td>
                )
              })
            }
          </tr>
        )
      },
      wrappedRowRender(row, $index) {
        const tr = this.rowRender(row, $index);
        return tr;
      }
    }
}
</script>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
}
tbody {
  color: #333333;
  border-collapse: collapse;
  width: 600px;
  td {
    border: #ddd solid 1px;
    width: 200px;
    padding: 12px;
    margin-top: -1px;
    margin-left: -1px;
    background-color: #ffffff;
  }
}
</style>