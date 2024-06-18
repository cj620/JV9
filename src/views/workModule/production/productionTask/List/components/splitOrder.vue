<!--拆单弹窗-->
<template>


  <jv-dialog
    :title="$t('production.Pr_SplitOrder')"
    width="40%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmItem"
    :autoFocus="true"
  >
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane :label="$t('production.Pr_EqualSplittingOfOrders')"  name="first">

        <JvForm :formObj="formObj">
        </JvForm>
      </el-tab-pane>
      <el-tab-pane :label="$t('production.Pr_CustomSplitOrder')" name="second">
        <div>
          <div>
            <span style="margin-right: 30px">{{$t('project.Pro_TotalQuantity')}}：{{totalQuantity}}</span>
            <span>{{$t('production.Pr_RemainingDetachableQuantity')}}：{{sum}}</span>

          </div>
          <div>

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


              <Action
                size="mini"
                slot="btn-list"
                :actions="[
          {
            /*新增*/
            label: $t('Generality.Ge_New'),
           disabled: IsDisabled,
            confirm: l_addRow.bind(),
          },


        ]"
              >
              </Action>
            </JvEditTable>

          </div>

        </div>

      </el-tab-pane>
    </el-tabs>



  </jv-dialog>


</template>

<script>
import { EditTable  } from "@/jv_doc/class/table";
import { Form } from "@/jv_doc/class/form";
import { production_task_split } from "@/api/workApi/production/productionTask";
export default {
  name: "splitOrder",
  data(){
    return{
      totalQuantity:0,
      remainingQuantity:0,
      activeName: 'first',
      eTableObj:{},
      formObj:{}
    }
  },
  props:{
    transferData:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    IsDisabled(){
      console.log(333,this.remainingQuantity<2?true:false,this.totalQuantity-this.remainingQuantity);
      return this.totalQuantity-this.remainingQuantity<2?true:false
    },
    sum(){
      let List = this.eTableObj.getTableData()
      this.remainingQuantity=List.reduce((prev,next)=>{
        return Number(prev)+Number(next.Quantity)
      },0)
      console.log(this.remainingQuantity,23233);
      if (Number(this.totalQuantity)<Number(this.remainingQuantity))  return  0
      return Number(this.totalQuantity)-Number(this.remainingQuantity)
    }
  },
  created(){
    console.log(this.transferData.Quantity);
    this.totalQuantity = this.transferData.Quantity
    this.eTableObj = new EditTable({
      tableSchema: [
        /*物料编号*/
        {
          prop: "Quantity",
          label:this.$t('production.Pr_SplitOrderQuantity'),
          formCpn: "FormInput",
          type:'number',
          filter: "amount",

        },
      ],
      data:[],
      title:'',
      importBar: false,
      sortCol: false,
      height:350,
      operationWidth:80,
    });
    this.formObj = new Form({
      formSchema:[
        {
          // 每单数量
          prop: "SplitQuantity",
          cpn: "FormInput",
          label: this.$t('production.Pr_QuantityPerOrder'),
          type:'number',
        },
        {
          // 数量
          prop: "totalQuantity",
          cpn: "FormInput",
          label: this.$t('project.Pro_TotalQuantity'),

          type:'number',
          cpnProps: {
            disabled: true,
          },
        },

      ],
      baseColProps: {
        span: 24,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    if(this.transferData.Quantity < 2) {
      this.formObj.formSchema[0].cpnProps = {
        disabled: true
      }
    }
    this.formObj.form.totalQuantity=this.transferData.Quantity

  },
  methods:{
    // 新增编辑行
    l_addRow() {

      this.eTableObj.push([{Quantity:1}]);
      let List = this.eTableObj.getTableData()
      console.log(List);
      this.remainingQuantity=List.reduce((prev,next)=>{
        return prev+next.Quantity
      },0)

    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    confirmItem(){
      let str = {
        BillId:this.transferData.BillId,
        SplitQuantity:this.formObj.form.SplitQuantity,
        Quantities:this.eTableObj.getTableData().map(x=>x.Quantity)
      }
      if (this.activeName==='first'){
        str.Quantities=[]
      }else {
        str.SplitQuantity=0
      }
      production_task_split(str).then(res=>{
        console.log(res);
        this.$emit('confirmSplitOrder')
      })

    }
  }
}
</script>

<style scoped>

</style>
