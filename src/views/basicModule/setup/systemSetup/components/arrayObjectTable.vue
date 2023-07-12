<template>
<div>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmData">
    <el-button @click="addItem" size="mini"  style="margin:0 0 10px 10px">添加</el-button>

    <JvEditTable :tableObj="eTableObj">
      <template #operation="{ row_index }">
        <TableAction
          :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
        />
      </template>
    </JvEditTable>
  </JvDialog>
</div>
</template>

<script>
import { EditTable } from "@/jv_doc/class/table";

export default {
  name: "arrayObjectTable",
  data(){
    return{
      eTableObj: {},
      DataList:[]
    }
  },
  props: {

    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
this.formatData()

    this.eTableObj = new EditTable({
      tableSchema:[
        {
          prop: "key",
          label:'配置值',
          formCpn: "FormInput",
        },
        {
          prop: "value",
          label:'内容',
          formCpn: "FormInput",
        }],
      data:[],
      title:'',
      tableHeaderShow:false,
      height:350,
      operationWidth:80,
    });
    this.eTableObj.setData(this.DataList);
  },
  methods:{
    formatData(){
      let str = JSON.parse(this.formData.ConfigValue)
      console.log(str);
      let arr =[]
      str.forEach(item=>{
        console.log(item);
        Object.keys(item).forEach(Titem=>{
          console.log(Titem);
          arr.push({
            key:Titem,
            value:item[Titem],
          })
        })
      })
      this.DataList=arr
    },
    addItem(){
      this.eTableObj.push([{
        key:'',
        value:'',
      }]);
    },
    //删除表格
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    confirmData(){
      let arr = JSON.parse(JSON.stringify(this.eTableObj.getTableData()))
      let arr1 = []

      arr.forEach(item=>{
        let str = {}
        console.log(item);
        str[item.key]=item.value
        arr1.push(str)
      })
      console.log(arr1);
      this.$emit('ArrayObjectConfirm',JSON.stringify(arr1))

    }
  }
}
</script>

<style scoped>

</style>
