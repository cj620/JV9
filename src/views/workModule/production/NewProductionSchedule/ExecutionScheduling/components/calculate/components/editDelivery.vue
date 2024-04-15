<!--
 * @Author: your name
 * @Date: 2021-12-28 09:18:36
 * @LastEditTime: 2022-09-01 14:10:34
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionSchedule\calculate\components\editDelivery.vue
-->
<!--修改交期-->
<template>
    <div>
      <jv-dialog
        :title="$t('Generality.Ge_EditDeliveryDate')"
        width="30%"
        :close-on-click-modal="true"
        :modal-append-to-body="false"
        :append-to-body="false"
        v-bind="$attrs"
        v-on="$listeners"
        @confirm="confirmItem"
      >
        <el-date-picker
          v-model="PlanEnd"
          type="date"
        >
        </el-date-picker>
      </jv-dialog>
    </div>
</template>

<script>
import {update_plan_end } from "@/api/workApi/production/productionTask";
export default {
  name: 'editDelivery',
data(){
  return{
    PlanEnd:''
  }
},
  props:{
    editDeliveryData:{
      type:Array,
      default:()=>[]
    },
    editDeliveryType:{
      type:String,
      default:()=>''
    }
  },
  created(){
    var day3 = new Date();
    const end=day3.getTime() + 24*60*60*1000*3
    this.PlanEnd = new Date(end)
  },
  methods:{
    confirmItem(){
      const str= {
        BillIds:this.editDeliveryData.map((x) => x.BillId),
        PlanEnd:this.PlanEnd
      }
      update_plan_end(str).then(res => {
        this.editDeliveryData.PlanEnd = this.PlanEnd
        this.$emit('completeEdit')
      })
    }
  }
}
</script>

<style scoped>

</style>
