<template>
  <div>
    <div class="report-card">
      <div v-for="(item,index) in cardDataList" class="report-card-list" :key="index">
        <div class="report-card-list-header"
             :style="{backgroundColor:ProcessStateMap[item.State]&&ProcessStateMap[item.State].color}"
             @click="jumpWorkOrder(item)">
          <div>
            {{item.PartNo}}
          </div>
          <div>
            {{item.Quantity}}
          </div>
        </div>

        <div class="report-card-list-center">
          <div>
            <el-image
                style="width: 50px; height: 50px;margin-right: 5px"
                :src="imgUrlPlugin(item.PhotoUrl?item.PhotoUrl:'')"
                fit="fill"
                class="report-card-list-center-Img-error">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline  error-icon"></i>
              </div>
            </el-image>
          </div>
          <div  class="report-card-list-center-right">
            <div> <slot name="contentTime" :row="item"></slot></div>
            <div> <slot name="content" :row="item"></slot></div>
          </div>
          <div  class="report-card-list-center-right-operate">
            <slot name="operateButton1" :row="item"></slot>
          </div>
        </div>
        <div class="report-card-list-middle">
          <div> <slot name="BillId" :row="item"></slot></div>
        </div>
        <div class="report-card-list-middle">
          <div> <slot name="Remarks" :row="item"></slot></div>
        </div>
        <div class="report-card-list-footer">
          <div class="report-card-list-footer-show" style="width: 190px;">

            <slot name="operateTime" :row="item"></slot>
          </div>
          <div class="report-card-list-footer-operate">

            <slot name="operateButton" :row="item"></slot>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
import  {imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { ProcessState } from "@/enum/workModule";

export default {
  name: 'cardList',
  data(){
    return{

    }
  },
  props:{
    cardDataList:{
      type:Array,
      default:()=>[]
    },
    type:{
      type: String,
      default:()=>''
    },


  },
  computed: {

    ProcessStateMap(){
      return ProcessState;
    },


  },
  methods:{
    imgUrlPlugin,
    //跳转到加工单
    jumpWorkOrder(row){
      this.$emit('viewProcess',row)

      /*  console.log(row.BillId)
        this.$router.push({
          name: "ProductionTaskDetails",
          query: { BillId: row.BillId },
        });*/
    }
  }
}
</script>

<style lang="scss" >
.report-card{
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;


  .report-card-list{
    margin: 0.55%;
    border: 1px solid #ccc;
    box-shadow: 3px 3px 3px #888888;
    border-radius: 10px;
    width: 270px;

    .report-card-list-header{
      background-color: #93E6FE;
      cursor: pointer;
      padding:2px 5px ;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
    }
    .report-card-list-center{
      display: flex;
      margin: 5px 0;
      padding:0 5px ;
      .report-card-list-center-Img-error{
        background-color: rgb(231, 231, 231);
        .image-slot {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          // color: rgb(161, 161, 161);
          .error-icon {
            color: rgb(161, 161, 161);
            font-size: 19px;
          }
        }
      }
      .report-card-list-center-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 190px;
      }
    }
    .report-card-list-middle{
      margin-left: 10px;
    }
    .report-card-list-footer{
      padding:2px 5px ;
      display: flex;
      align-items: center;
      .report-card-list-footer-operate{
        margin-left: 10px;
      }

    }
  }

}
.report-card-list-footer-show {
  width: 100% !important;
  display: flex;
  justify-content: space-around;
}
</style>
