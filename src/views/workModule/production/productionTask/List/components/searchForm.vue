<!--
 * @Author: your name
 * @Date: 2022-01-14 11:19:16
 * @LastEditTime: 2022-01-20 16:35:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionTask\List\components\searchForm.vue
-->
<template>
  <el-drawer
    v-bind="$attrs"
    v-on="$listeners"
  >
  <div class="table-search-form">
    <div class="title">{{ $t("Generality.Ge_SearchForm") }}</div>
    <el-divider />
    <JvForm :formObj="formObj"> </JvForm>
    <div class="btn-footer">
      <!-- 重置 -->
      <el-button style="margin-right: 10px" @click="reset">{{
        $t("Generality.Ge_Reset")
        }}</el-button>
      <!-- 搜索 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-right: 30px"
        @click="search"
      >{{ $t("Generality.Ge_Search") }}</el-button
      >
    </div>
  </div>
  </el-drawer>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
export default {
  name: 'searchForm',
  data(){
    return{
      formObj:{}
    }
  },
  props:{
    searchFormData:{
      type:Object,
      default:()=>{}
    }
  },
  created(){
    this.formObj = new Form({
      formSchema:[
        {
          // 模具编号
          prop: 'ToolingNo',
          cpn: "FormInput",
          label: this.$t("Generality.Ge_ToolingNo"),
        },
      ],
      baseColProps: {
        span: 24,
      },

    });
    this.formObj.form.ToolingNo=this.searchFormData.ToolingNo
  },
  methods:{
    reset(){
      this.formObj.form.ToolingNo=''
      this.$emit('search',this.formObj.form)
    },
    search(){
      this.$emit('search',this.formObj.form)
    },
  }
}
</script>

<style lang="scss" scoped>
  .table-search-form {
    position: relative;
    padding: 30px;
    height: 100%;
    .title {
      color: rgb(77, 77, 77);
      font-size: 20px;
    }
    .btn-footer {
      width: 100%;
      height: 75px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: end;
      border-top: 1px solid #ccc;
      padding-top: 20px;
    }
  }
  .table-search-form .el-form-item__label {
    font-size: 12px;
    // line-height: 20px;
  }
</style>
