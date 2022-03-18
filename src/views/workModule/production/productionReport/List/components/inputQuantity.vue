<!--
 * @Author: your name
 * @Date: 2022-01-13 11:02:19
 * @LastEditTime: 2022-01-14 13:56:19
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionReport\List\components\inputQuantity.vue
-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_Quantity')"
      width="30%"
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
          <el-input style="width: 220px" ref="refFocus" v-model="ruleForm.Quantity"></el-input>
        </el-form-item>
      </el-form>
    </jv-dialog>
  </div>
</template>

<script>
export default {
  name: 'inputQuantity',
  data(){
    return {
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
  created(){
    this.$nextTick(()=> {
      this.$refs.refFocus.$el.querySelector('input').focus()
    })
    this.ruleForm.Quantity = this.defaultQuantity
  },
  props:{
    defaultQuantity:{
      type:Number,
      default:()=>1
    }
  },
  methods:{
    confirmItem(){
      this.$emit('confirmQuantity',this.ruleForm.Quantity)
    }
  }
}
</script>

<style scoped>

</style>
