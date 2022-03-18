<!--工序同时进站选择-->
<template>
    <div>
      <jv-dialog
        :title="$t('Generality.Ge_ChooseProcess')"
        width="90%"
        :close-on-click-modal="true"
        :modal-append-to-body="false"
        :append-to-body="false"
        v-bind="$attrs"
        v-on="$listeners"
        @confirm="confirmItem"
      >
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"

                 >
          <el-form-item :label="$t('Generality.Ge_Quantity')" prop="Quantity">
            <el-input style="width: 220px" v-model="ruleForm.Quantity"></el-input>
          </el-form-item>
        </el-form>
        <div class="selection_process">

          <div @click="clickSelected(item,index)"   :class="[isActive === index ? 'active' : '', 'selection_process_item']"  v-for="(item,index) in transferData" :key="index">
            <div
              class="data-right-content-icon"
              v-show="isActive === index"
            >
              <i
                class="el-icon-success"
                style="color: #4B8CE4;font-size: 16px"
              ></i>
            </div>
            {{item.Process}}
          </div>

        </div>
      </jv-dialog>
    </div>
</template>

<script>
export default {
  name: 'selectProcess',
  data(){
    return{
      isActive: '',
      multipleSelection: [],
      ruleForm:{
        Quantity:1
      },
      rules: {
        name: [
          { required: true,  trigger: 'blur' },
        ],
      }
    }
  },
  props:{
    transferData:{
      type:Array,
      default:()=>[]
    }
  },
  created() {
    console.log(this.transferData,'数据')
    this.transferData.forEach(item=>{
      item.IsHas = false
    })
    this.ruleForm.Quantity = this.transferData[0].Quantity
  },
  methods:{
    //点击选中进站
    clickSelected(row,index){

      this.isActive = index
      this.multipleSelection=[row]
    },
    confirmItem(){

      if(this.multipleSelection.length>0){
        const transferData = {
          Data:this.multipleSelection,
          Quantity:this.ruleForm.Quantity,
        }
        this.$emit('confirmSelectProcess',transferData)
      }else {
        this.$message.warning(this.$t("Generality.Ge_SelectInboundProcess"));
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .selection_process{
    display: flex;
  .selection_process_item{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height:100px;
    border: 1px solid #000;
    font-size: 18px;
    font-weight: 500;
    border-radius: 3px;
  .data-right-content-icon {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  }
  .selection_process_item+.selection_process_item{
    margin-left: 10px;


  }
  .active{
    border: 1px solid #006fff;
    color:#006fff ;
  }

  }
</style>
