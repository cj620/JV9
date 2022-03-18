<!--
 * @Author: C.
 * @Date: 2021-08-09 14:07:38
 * @LastEditTime: 2022-01-17 10:44:33
 * @Description: file content
-->
<template>
  <div class="print-setting-view">
    <div class="item-wrapper">
      <i class="el-icon-printer" style="font-size: 100px; color: #bbb"></i>
    </div>
    <el-form label-width="100px" style="margin-top: 20px">
      <el-form-item :label="$t('Generality.Ge_PrintTemplate')" prop="template">
        <el-select
          v-model="form.template"
        
          @change="tmChange"
        >
          <el-option
            v-for="item in TmpList"
            :key="item.Id"
            :label="item.Name"
            :value="item"
          ></el-option>
        </el-select>
        <span class="add-new-tmp" @click="addNewTmpShow = true">{{$t('Generality.Ge_AddNewTemplate')}}</span>
      </el-form-item>
    </el-form>

    <el-dialog
      :title="$t('Generality.Ge_AddNewTemplate')"
      :visible.sync="addNewTmpShow"
      width="30%"
      :append-to-body="true"
    >
      <el-form :model="newTmp" ref="newTmp" class="newTmp" label-width="100px">
        <el-form-item
          :label="$t('Generality.Ge_TemplateName')"
          prop="Name"
          :rules="[{ required: true, message: $t('Generality.Ge_TemplateCannotBeEmpty') }]"
        >
          <el-input v-model="newTmp.Name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewTmpShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        template: "",
      },
      newTmp: {
        Name: "",
      },
      addNewTmpShow: false,
    };
  },
  methods: {
    ...mapMutations("print", ["CHANG_TMP", "ADD_NEW_TMP"]),
    tmChange(e) {
      this.form.template = e.Name;
      this.CHANG_TMP(e);
    },
    confirm() {
      this.$refs["newTmp"].validate((valid) => {
        if (valid) {
          this.ADD_NEW_TMP(this.newTmp.Name);
          this.newTmp = {
            Name: "",
          };
          this.$router.push({ name: "printEdit" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapState({
      TmpList: (state) => state.print.TmpList,
      CurTmp: (state) => state.print.CurTmp,
    }),
  },
  watch: {
    TmpList: {
      handler(n, o) {
        console.log();
        this.form.template = this.CurTmp.Name || this.TmpList[0].Name || "";
      },
    },
  },
};
</script>

<style lang="scss">
@import "../../style/print-edit.scss";
</style>
