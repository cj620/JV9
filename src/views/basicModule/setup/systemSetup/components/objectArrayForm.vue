<template>
<div>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmData">


  <el-button @click="add" size="mini"  style="margin-bottom: 10px">添加</el-button>
  <div  v-for="(item,index) in DataList" :key="index" style="margin-bottom: 10px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{item.label}}</span>
        <el-button style="float: right; padding: 3px 10px" type="text" @click="delCard(item,index)">删除</el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="editCard(item)">编辑</el-button>

      </div>
      <div v-for="(Titem,index) in item.value" :key="index">
        <span>{{Titem.key1}}</span>
      </div>
    </el-card>
  </div>

  <JvDialog
    title="编辑"
    :visible.sync="editDialogVisible"
    v-if="editDialogVisible"
    width="70%"
    @confirm="confirm">
    <el-input v-model="titleLabel" style="width: 220px;margin:0 10px "  size="mini"></el-input>
    <el-button @click="addItem" size="mini"  style="margin-bottom: 10px">添加</el-button>

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
  </JvDialog>
</div>
</template>

<script>
import { EditTable } from "@/jv_doc/class/table";
export default {
  name: "objectArrayForm",
  data(){
    return{
      DataList:[],
      CopyData:{},
      eTableObj: {},
      titleLabel:'',
      editDialogVisible:false
    }
  },
  props: {

    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {

    console.log(JSON.parse(this.formData.ConfigValue))
    let str = JSON.parse(this.formData.ConfigValue)
    let arr =[]
    Object.keys(str).forEach(item=>{
      let arr1 =[]
      str[item].forEach(TItem=>{
        arr1.push({
          key1:TItem
        })
      })
      arr.push({
        label:item,
        value:arr1
      })
    })
    console.log(arr);
    this.DataList=arr
  },
  methods:{
    //新增卡片
    add(){
      console.log(this.DataList)
      this.DataList.push({
        label:'',
          value:[]
      })
    },
    //编辑卡片
    editCard(e){
      console.log(e);
      this.CopyData = e
      this.editDialogVisible = true
      this.titleLabel = e.label
      this.eTableObj = new EditTable({
        tableSchema:[
          {
            prop: "key1",
            label:'内容',
            formCpn: "FormInput",
          }],
        data:[],
        title:'',
        tableHeaderShow:false,
        height:350,
        operationWidth:80,
      });
      this.eTableObj.setData(e.value);
    },

    confirm(){
      this.editDialogVisible = false
      this.CopyData.label=this.titleLabel
      this.CopyData.value=this.eTableObj.getTableData()
      console.log(this.CopyData,this.DataList);
    },
    //删除卡片
    delCard(e,index){
      console.log(e,index);
      this.DataList.splice(index,1);
    },
    addItem(){
      this.eTableObj.push([{
        key1:''
      }]);
    },

    //删除表格
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    confirmData(){
      let arr = JSON.parse(JSON.stringify(this.DataList))
      console.log(arr);
      let str = {}
      arr.forEach(item=>{
        str[item.label] =item.value.map(x=>x.key1)
      })
      this.$emit('ObjectArrayConfirm',JSON.stringify(str))

    }
  }
}
</script>

<style scoped>

</style>
