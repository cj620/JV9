<template>
  <jv-dialog
    title="出入库记录"
    width="35%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmItem"
  >
    <div style="font-size: 30px;margin-bottom: 10px">
      <span v-if="InventoryState==='InPut'">出库</span>
      <span v-else-if="InventoryState==='OutPut'">入库</span>
    </div>
    <JvForm :formObj="formObj">
    </JvForm>
  </jv-dialog>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { assets_device_stock_ops_add } from "@/api/workApi/equipment/record";
export default {
    name: "addStockOps",
  data(){
      return{
        formObj:{},
        InventoryState:''
      }
  },
  props:{
    transferData:{
      type:Object,
      default:()=>{}
    }
  },
  created(){
    this.formObj = new Form({
      formSchema:[
        {
          // 目的地/来源地
          prop: "StockOpsInfo",
          cpn: "FormInput",
          label: '目的地/来源地',
        },
        {
          // 描述
          prop: "Remarks",
          cpn: "FormInput",
          label: '描述',
        },
      ],
      baseColProps: {
        span: 24,
      },
      gutter: 30,
      labelWidth: "80px",
    });

    console.log(this.transferData.DeviceNo,this.transferData.InventoryState,this.formObj.form.DeviceNo);
    this.formObj.form.DeviceNo=this.transferData.DeviceNo
    this.InventoryState=this.transferData.InventoryState
  },
  methods:{
    confirmItem(){

      assets_device_stock_ops_add(this.formObj.form).then(res=>{
        console.log(res);
        this.$emit('confirmStockOps')
      })

    }
  }
}
</script>

<style scoped>

</style>
