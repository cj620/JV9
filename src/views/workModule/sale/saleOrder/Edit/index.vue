<!--编辑销售订单-->
<template>
  <div>
    <EditCom :billData="billData" :type="type" >

    </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";
import { releaseEditLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  name: 'EditProductionTask',
  components: {
    EditCom
  },
  data(){
    return{
      type:'edit',
      billData:''
    }
  },


  created() {
    console.log(this.$route.query)
    this.billData = this.$route.query.BillId
  },

  //销毁
  beforeDestroy(){
      releaseEditLock({BillId:this.billData}).then(res=>{
        console.log(res,'销毁成功')
      })
  },

}
</script>

<style lang="scss" scoped>

</style>
