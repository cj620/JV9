<!--
 * @Author: C.
 * @Date: 2021-07-23 11:13:47
 * @LastEditTime: 2022-01-17 10:32:15
 * @Description: file content
-->
<template>
  <div class="table-set">
    <div class="btn-group">
      <div class="btn" @click="addTableShow = true">{{$t("Generality.Ge_AddNewTable")}}</div>
    </div>
    <div v-if="flash">
      <TableObj
        :cdata="tableItem"
        v-for="tableItem in table"
        :key="tableItem.id"
      ></TableObj>
    </div>
    <el-dialog
      :append-to-body="true"
      :title="$t('Generality.Ge_AddNewTable')"
      :visible.sync="addTableShow"
      width="30%"
      class="add-field-style"
    >
      <el-form label-width="100px" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('Generality.Ge_TableTitle')" prop="title.label">
          <el-input v-model="form.title.label" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_TableField')" prop="prop">
          <el-input v-model="form.prop" style="width: 75%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="confirm" size="mini">确定</el-button>
        <el-button @click="addTableShow = false" size="mini">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TableObj from "./cpn/TableObj";
import { TableConstructor } from "../../../../../utils";
export default {
  components: {
    TableObj,
  },
  data() {
    return {
      flash: true,
      addTableShow: false,
      form: {},
      copyForm: {},
      rules: {
        "title.label": [
          { required: true, message: this.$t('Generality.Ge_PleaseInputTableTitle'), trigger: "blur" },
        ],
        prop: [{ required: true, message: this.$t('Generality.Ge_PleaseInputTableField'), trigger: "blur" }],
      },
    };
  },
  created() {
    this.form = TableConstructor();
  },
  methods: {
    ...mapMutations("print", ["ADD_TABLE"]),
    confirm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.flash = false;
          this.table.push(JSON.parse(JSON.stringify(this.form)));
          this.form = TableConstructor();
          this.addTableShow = false;
          this.$nextTick(() => {
            this.flash = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // console.log(this.form);
    },
  },
  mounted() {
    // this.rowDrop()
  },
  computed: {
    ...mapState({
      table: (state) => state.print.table,
    }),
  },
};
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
