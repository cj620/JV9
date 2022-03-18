<!--编辑库存期初-->
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
  name: 'St_CostChange_Edit',
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
 
    this.billData = this.$route.query.BillId
  },

  //销毁
  beforeDestroy(){
      releaseEditLock({BillId:this.billData}).then(res=>{
 
      })
  },

}
</script>

<style lang="scss" scoped>

</style>
